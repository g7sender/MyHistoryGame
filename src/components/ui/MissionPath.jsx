import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameProgress } from '../../state/GameProgressContext.jsx'

const ROW_HEIGHT = 112
const NODE_SIZE = 64
const BOSS_NODE_SIZE = 76
// מיקום אופקי (אחוזים, 0-100) של כל node לפי מחזור של 4, כדי ליצור מסלול מתפתל
const WAVE_X = [50, 74, 50, 26]

export default function MissionPath({ world }) {
  const { isMissionUnlocked, isMissionCompleted, isBossUnlocked, isBossCompleted } = useGameProgress()
  const missions = world.missions
  const hasBoss = Boolean(world.boss)
  const rowCount = missions.length + (hasBoss ? 1 : 0)

  const points = missions.map((mission, index) => ({
    mission,
    index,
    x: WAVE_X[index % WAVE_X.length],
    y: index * ROW_HEIGHT + ROW_HEIGHT / 2,
  }))
  const bossPoint = hasBoss
    ? { x: WAVE_X[missions.length % WAVE_X.length], y: missions.length * ROW_HEIGHT + ROW_HEIGHT / 2 }
    : null
  const totalHeight = rowCount * ROW_HEIGHT

  const linePoints = hasBoss ? [...points, { ...bossPoint }] : points
  const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

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
          <motion.div
            animate={{ scale: completed ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.4 }}
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
          </motion.div>
        )

        return (
          <div
            key={mission.id}
            className="absolute"
            style={{ left: `${x}%`, top: y, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-1"
            >
              {unlocked ? (
                <Link to={`/world/${world.id}/mission/${mission.id}/story`}>{node}</Link>
              ) : (
                node
              )}
              <span className="max-w-[7rem] truncate text-center text-xs font-medium text-white/70">
                {mission.title}
              </span>
            </motion.div>
          </div>
        )
      })}

      {hasBoss &&
        (() => {
          const unlocked = isBossUnlocked(world)
          const completed = isBossCompleted(world.id)
          const node = (
            <motion.div
              animate={
                completed ? { scale: [1, 1.2, 1] } : unlocked ? { scale: [1, 1.06, 1] } : { scale: 1 }
              }
              transition={
                completed
                  ? { duration: 0.4 }
                  : unlocked
                    ? { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
                    : { duration: 0.2 }
              }
              className={`flex shrink-0 items-center justify-center rounded-full border-4 text-2xl shadow-lg transition ${
                completed
                  ? 'border-[var(--world-accent)] bg-[var(--world-accent)]'
                  : unlocked
                    ? 'border-[var(--world-accent)]/70 bg-white/10 active:scale-95'
                    : 'border-white/10 bg-white/[0.03] text-white/40'
              }`}
              style={{ width: BOSS_NODE_SIZE, height: BOSS_NODE_SIZE }}
            >
              {completed ? '✓' : unlocked ? '👑' : '🔒'}
            </motion.div>
          )

          return (
            <div
              key="boss"
              className="absolute"
              style={{ left: `${bossPoint.x}%`, top: bossPoint.y, transform: 'translate(-50%, -50%)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: missions.length * 0.05 }}
                className="flex flex-col items-center gap-1"
              >
                {unlocked ? <Link to={`/world/${world.id}/boss`}>{node}</Link> : node}
                <span className="max-w-[7rem] truncate text-center text-xs font-bold text-white">
                  {world.boss.title}
                </span>
              </motion.div>
            </div>
          )
        })()}
    </div>
  )
}
