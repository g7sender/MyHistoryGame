import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getMissionById, getWorldById } from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import TopBar from '../ui/TopBar.jsx'

export default function StoryScreen() {
  const { worldId, missionId } = useParams()
  const navigate = useNavigate()
  const world = getWorldById(worldId)
  const mission = getMissionById(world, missionId)
  const { isMissionUnlocked } = useGameProgress()

  if (!world || !mission) return <Navigate to="/" replace />
  if (!isMissionUnlocked(world, mission.id)) {
    return <Navigate to={`/world/${world.id}`} replace />
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
      <main className="flex-1 px-4 pt-6">
        {mission.story.image && (
          <img
            src={mission.story.image}
            alt={mission.story.imageAlt || mission.title}
            className="mb-4 max-h-56 w-full rounded-xl object-cover"
          />
        )}
        <p className="whitespace-pre-line text-base leading-loose text-white/90">
          {mission.story.text}
        </p>
      </main>
      <div className="px-4 pt-6">
        <button
          type="button"
          onClick={() => navigate(`/world/${world.id}/mission/${mission.id}/challenge`)}
          className="w-full rounded-xl py-4 text-lg font-bold text-slate-900 shadow-lg active:scale-[0.98]"
          style={{ backgroundColor: world.theme.accent }}
        >
          למשימה →
        </button>
      </div>
    </div>
  )
}
