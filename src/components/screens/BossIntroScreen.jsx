import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import { pageTransition } from '../ui/pageTransition.js'

export default function BossIntroScreen() {
  const { worldId } = useParams()
  const navigate = useNavigate()
  const world = getWorldById(worldId)
  const { isBossUnlocked } = useGameProgress()

  if (!world || !world.boss) return <Navigate to="/map" replace />
  if (!isBossUnlocked(world)) {
    return <Navigate to={`/world/${world.id}`} replace />
  }

  return (
    <motion.div
      {...pageTransition}
      className="flex min-h-full flex-col pb-6"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title={world.boss.title} subtitle={world.name} />
      <PlayerStatsBar />
      <main className="flex-1 px-4 pt-6">
        <p className="whitespace-pre-line text-base leading-loose text-white/90">
          {world.boss.intro}
        </p>
      </main>
      <div className="px-4 pt-6">
        <button
          type="button"
          onClick={() => navigate(`/world/${world.id}/boss/challenge`)}
          className="w-full rounded-xl py-4 text-lg font-bold text-slate-900 shadow-lg active:scale-[0.98]"
          style={{ backgroundColor: world.theme.accent }}
        >
          התחילו את האתגר →
        </button>
      </div>
    </motion.div>
  )
}
