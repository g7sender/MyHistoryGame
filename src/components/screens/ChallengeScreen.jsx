import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMissionById, getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import AnswerFeedback from '../ui/AnswerFeedback.jsx'
import { pageTransition } from '../ui/pageTransition.js'
import { getChallengeComponent } from '../challenges/challengeRegistry.js'

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
  const ChallengeWidget = getChallengeComponent(challenge)

  function handleAnswered(correct) {
    if (hasAnswered) return
    setResult(correct)
    completeMission(mission.id)
    recordAnswer(correct)
  }

  return (
    <motion.div
      {...pageTransition}
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

        {hasAnswered && <AnswerFeedback result={result} explanation={challenge.explanation} />}
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
    </motion.div>
  )
}
