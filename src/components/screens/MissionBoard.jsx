import { Navigate, useParams } from 'react-router-dom'
import { getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import TopBar from '../ui/TopBar.jsx'
import MissionCard from '../ui/MissionCard.jsx'

export default function MissionBoard() {
  const { worldId } = useParams()
  const world = getWorldById(worldId)
  const { isMissionUnlocked, isMissionCompleted } = useGameProgress()

  if (!world) return <Navigate to="/" replace />

  return (
    <div
      className="min-h-full pb-10"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title={world.name} subtitle={world.subtitle} />
      <p className="px-4 pb-4 pt-4 text-sm leading-relaxed text-white/70">{world.whyItMatters}</p>
      <main className="flex flex-col gap-3 px-4">
        {world.missions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            world={world}
            mission={mission}
            index={index}
            unlocked={isMissionUnlocked(world, mission.id)}
            completed={isMissionCompleted(mission.id)}
          />
        ))}
      </main>
    </div>
  )
}
