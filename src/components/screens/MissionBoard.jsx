import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getWorldById } from '../../data/worlds.js'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import MissionPath from '../ui/MissionPath.jsx'
import { pageTransition } from '../ui/pageTransition.js'

export default function MissionBoard() {
  const { worldId } = useParams()
  const world = getWorldById(worldId)

  if (!world) return <Navigate to="/" replace />

  return (
    <motion.div
      {...pageTransition}
      className="min-h-full pb-10"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title={world.name} subtitle={world.subtitle} />
      <PlayerStatsBar />
      <p className="px-4 pb-4 pt-4 text-sm leading-relaxed text-white/70">{world.whyItMatters}</p>
      <main className="pb-6">
        <MissionPath world={world} />
      </main>
    </motion.div>
  )
}
