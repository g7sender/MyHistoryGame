import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getMissionById, getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import { shuffleArray } from '../../utils/shuffleArray.js'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import AnswerOption from '../ui/AnswerOption.jsx'

export default function ChallengeScreen() {
  const { worldId, missionId } = useParams()
  const navigate = useNavigate()
  const world = getWorldById(worldId)
  const mission = getMissionById(world, missionId)
  const { isMissionUnlocked, completeMission, recordAnswer } = useGameProgress()
  const [selectedIndex, setSelectedIndex] = useState(null)

  // מערבבים את סדר האפשרויות בכל פעם שנכנסים למשימה, כדי שהתשובה הנכונה
  // לא תהיה תמיד באותו מקום. כל איבר שומר את originalIndex כדי לבדוק נכונות.
  const shuffledOptions = useMemo(() => {
    if (!mission) return []
    return shuffleArray(mission.challenge.options.map((label, originalIndex) => ({ label, originalIndex })))
  }, [mission])

  if (!world || !mission) return <Navigate to="/" replace />
  if (!isMissionUnlocked(world, mission.id)) {
    return <Navigate to={`/world/${world.id}`} replace />
  }

  const { challenge } = mission
  const hasAnswered = selectedIndex !== null
  const isCorrect = hasAnswered && shuffledOptions[selectedIndex].originalIndex === challenge.correctIndex

  function handleSelect(index) {
    if (hasAnswered) return
    setSelectedIndex(index)
    completeMission(mission.id)
    recordAnswer(shuffledOptions[index].originalIndex === challenge.correctIndex)
  }

  function optionState(index) {
    if (!hasAnswered) return 'idle'
    if (shuffledOptions[index].originalIndex === challenge.correctIndex) return 'correct'
    if (index === selectedIndex) return 'wrong'
    return 'idle'
  }

  return (
    <div
      className="flex min-h-full flex-col pb-6"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title={mission.title} subtitle={world.name} />
      <PlayerStatsBar />
      <main className="flex-1 px-4 pt-6">
        <h2 className="mb-5 text-lg font-bold leading-relaxed text-white">
          {challenge.question}
        </h2>
        <div className="flex flex-col gap-3">
          {shuffledOptions.map((option, index) => (
            <AnswerOption
              key={option.label}
              label={option.label}
              state={optionState(index)}
              disabled={hasAnswered}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>

        {hasAnswered && (
          <div
            className={`mt-5 rounded-xl border p-4 ${
              isCorrect ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10'
            }`}
          >
            <p className="font-bold text-white">{isCorrect ? 'תשובה נכונה! 🎉' : 'לא בדיוק...'}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{challenge.explanation}</p>
          </div>
        )}
      </main>

      {hasAnswered && (
        <div className="px-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(`/world/${world.id}`)}
            className="w-full rounded-xl py-4 text-lg font-bold text-slate-900 shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: world.theme.accent }}
          >
            חזרה ללוח המשימות
          </button>
        </div>
      )}
    </div>
  )
}
