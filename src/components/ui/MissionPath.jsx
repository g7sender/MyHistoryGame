import { Link } from 'react-router-dom'
import { useGameProgress } from '../../state/GameProgressContext.jsx'

const ROW_HEIGHT = 112
const NODE_SIZE = 64
// מיקום אופקי (אחוזים, 0-100) של כל node לפי מחזור של 4, כדי ליצור מסלול מתפתל
const WAVE_X = [50, 74, 50, 26]

export default function MissionPath({ world }) {
  const { isMissionUnlocked, isMissionCompleted } = useGameProgress()
  const missions = world.missions
  const points = missions.map((mission, index) => ({
    mission,
    index,
    x: WAVE_X[index % WAVE_X.length],
    y: index * ROW_HEIGHT + ROW_HEIGHT / 2,
  }))
  const totalHeight = missions.length * ROW_HEIGHT

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  return (
    <div className="relative px-4" style={{ height: totalHeight }}>
      <svg
        className="absolute inset-x-4 top-0"
        style={{ height: totalHeight, width: 'calc(100% - 2rem)' }}
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={linePath}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      </svg>

      {points.map(({ mission, index, x, y }) => {
        const unlocked = isMissionUnlocked(world, mission.id)
        const completed = isMissionCompleted(mission.id)

        const node = (
          <div
            className={`flex shrink-0 items-center justify-center rounded-full border-4 text-lg font-bold shadow-lg transition ${
              completed
                ? 'border-[var(--world-accent)] bg-[var(--world-accent)] text-[var(--world-secondary)]'
                : unlocked
                  ? 'border-white/30 bg-white/10 text-white active:scale-95'
                  : 'border-white/10 bg-white/[0.03] text-white/40'
            }`}
            style={{ width: NODE_SIZE, height: NODE_SIZE }}
          >
            {completed ? '✓' : unlocked ? index + 1 : '🔒'}
          </div>
        )

        return (
          <div
            key={mission.id}
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${x}%`, top: y, transform: 'translate(-50%, -50%)' }}
          >
            {unlocked ? (
              <Link to={`/world/${world.id}/mission/${mission.id}/story`}>{node}</Link>
            ) : (
              node
            )}
            <span className="max-w-[7rem] truncate text-center text-xs font-medium text-white/70">
              {mission.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}
