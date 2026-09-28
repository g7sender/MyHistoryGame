import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getMissionById, getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import MultipleChoiceChallenge from '../challenges/MultipleChoiceChallenge.jsx'
import TimelineOrderChallenge from '../challenges/TimelineOrderChallenge.jsx'
import MatchingChallenge from '../challenges/MatchingChallenge.jsx'
import ImageChallenge from '../challenges/ImageChallenge.jsx'
import MapLocationChallenge from '../challenges/MapLocationChallenge.jsx'
import WhoAmIChallenge from '../challenges/WhoAmIChallenge.jsx'
import SpeedChoiceChallenge from '../challenges/SpeedChoiceChallenge.jsx'

const CHALLENGE_COMPONENTS = {
  'multiple-choice': MultipleChoiceChallenge,
  'timeline-order': TimelineOrderChallenge,
  matching: MatchingChallenge,
  image: ImageChallenge,
  'map-location': MapLocationChallenge,
  'who-am-i': WhoAmIChallenge,
  'speed-choice': SpeedChoiceChallenge,
}

export default function ChallengeScreen() {
  const { worldId, missionId } = useParams()
  const navigate = useNavigate()
  const world = getWorldById(worldId)
  const mission = getMissionById(world, missionId)
  const { isMissionUnlocked, completeMission, recordAnswer } = useGameProgress()
  const [result, setResult] = useState(null)

  if (!world || !mission) return <Navigate to="/" replace />
  if (!isMissionUnlocked(world, mission.id)) {
    return <Navigate to={`/world/${world.id}`} replace />
  }

  const { challenge } = mission
  const hasAnswered = result !== null
  const ChallengeWidget = CHALLENGE_COMPONENTS[challenge.type || 'multiple-choice']

  function handleAnswered(correct) {
    if (hasAnswered) return
    setResult(correct)
    completeMission(mission.id)
    recordAnswer(correct)
  }

  return (
    <div
      key={mission.id}
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
