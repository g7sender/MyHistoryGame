import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import { shuffleArray } from '../../utils/shuffleArray.js'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import { getChallengeComponent } from '../challenges/challengeRegistry.js'

const MAX_BOSS_QUESTIONS = 7

// הבוס שולף מדגם אקראי מתוך המשימות שכבר קיימות בעולם - אין תוכן ייעודי לבוס,
// כל שאלה משתמשת באותו רכיב לפי challenge.type בדיוק כמו במשימה רגילה.
export default function BossChallengeScreen() {
  const { worldId } = useParams()
  const navigate = useNavigate()
  const world = getWorldById(worldId)
  const { isBossUnlocked, recordAnswer, completeBoss } = useGameProgress()

  const questions = useMemo(() => {
    if (!world) return []
    return shuffleArray(world.missions).slice(0, MAX_BOSS_QUESTIONS)
  }, [world])

  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [result, setResult] = useState(null)

  if (!world || !world.boss) return <Navigate to="/" replace />
  if (!isBossUnlocked(world)) {
    return <Navigate to={`/world/${world.id}`} replace />
  }

  const mission = questions[index]
  const { challenge } = mission
  const hasAnswered = result !== null
  const ChallengeWidget = getChallengeComponent(challenge)
  const isLastQuestion = index === questions.length - 1

  function handleAnswered(correct) {
    if (hasAnswered) return
    setResult(correct)
    recordAnswer(correct)
    if (correct) setCorrectCount((count) => count + 1)
  }

  function handleNext() {
    if (isLastQuestion) {
      completeBoss(world.id)
      navigate(`/world/${world.id}/boss/victory`, {
        state: { correctCount, total: questions.length },
      })
      return
    }
    setIndex((i) => i + 1)
    setResult(null)
  }

  return (
    <div
      key={`${world.id}-${index}`}
      className="flex min-h-full flex-col pb-6"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title={world.boss.title} subtitle={world.name} onBack={false} />
      <PlayerStatsBar />
      <main className="flex-1 px-4 pt-6">
        <p className="mb-2 text-sm font-bold text-white/60">
          שאלה {index + 1} מתוך {questions.length}
        </p>
        <h2 className="mb-5 text-lg font-bold leading-relaxed text-white">{challenge.question}</h2>
        <ChallengeWidget challenge={challenge} onAnswered={handleAnswered} />

        {hasAnswered && (
          <div
            className={`mt-5 rounded-xl border p-4 ${
              result ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10'
            }`}
          >
            <p className="font-bold text-white">{result ? 'תשובה נכונה! 🎉' : 'לא בדיוק...'}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{challenge.explanation}</p>
          </div>
        )}
      </main>

      {hasAnswered && (
        <div className="px-4 pt-6">
          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-xl py-4 text-lg font-bold text-slate-900 shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: world.theme.accent }}
          >
            {isLastQuestion ? 'סיימו את האתגר' : 'השאלה הבאה →'}
          </button>
        </div>
      )}
    </div>
  )
}
