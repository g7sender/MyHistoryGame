import { useMemo } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getWorldById } from '../../data/worlds.js'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import { pageTransition } from '../ui/pageTransition.js'

const CONFETTI = ['🎉', '⭐', '🎊', '✨']

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function BossVictoryScreen() {
  const { worldId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const world = getWorldById(worldId)

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        icon: CONFETTI[i % CONFETTI.length],
        x: rand(-90, 90),
        y: rand(-110, -20),
        rotate: rand(-90, 90),
      })),
    [],
  )

  if (!world || !world.boss) return <Navigate to="/" replace />
  // המסך הזה מגיע רק מניווט פנימי מייד אחרי סיום האתגר (state בזיכרון) - גישה ישירה
  // (או רענון) שולחת בחזרה ללוח המשימות, כי אין ציון לשחזר.
  if (!location.state) return <Navigate to={`/world/${world.id}`} replace />

  const { correctCount, total } = location.state

  return (
    <motion.div
      {...pageTransition}
      className="flex min-h-full flex-col items-center pb-6 text-center"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title="ניצחון!" subtitle={world.name} onBack={false} />
      <PlayerStatsBar />
      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex flex-1 flex-col items-center justify-center px-4 pt-6"
      >
        <div className="relative text-7xl">
          <motion.span
            variants={itemVariants}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
            className="block"
          >
            🏆
          </motion.span>
          {confettiPieces.map((piece, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute left-1/2 top-1/2 text-2xl"
              initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              animate={{ opacity: 0, x: piece.x, y: piece.y, scale: 0, rotate: piece.rotate }}
              transition={{ delay: i * 0.03, duration: 1, ease: 'easeOut' }}
            >
              {piece.icon}
            </motion.span>
          ))}
        </div>
        <motion.h2 variants={itemVariants} className="mt-4 text-2xl font-extrabold text-white">
          כבשת את {world.boss.title}!
        </motion.h2>
        <motion.p variants={itemVariants} className="mt-2 text-white/80">
          ענית נכון על {correctCount} מתוך {total} שאלות
        </motion.p>
        <motion.p variants={itemVariants} className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
          {world.name} עכשיו רשום כפרק שלם בספר ההיסטוריה שלך.
        </motion.p>
      </motion.main>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex w-full flex-col gap-3 px-4 pt-6"
      >
        <motion.button
          variants={itemVariants}
          type="button"
          onClick={() => navigate('/book')}
          className="w-full rounded-xl py-4 text-lg font-bold text-slate-900 shadow-lg active:scale-[0.98]"
          style={{ backgroundColor: world.theme.accent }}
        >
          📖 לספר ההיסטוריה
        </motion.button>
        <motion.button
          variants={itemVariants}
          type="button"
          onClick={() => navigate('/')}
          className="w-full rounded-xl border border-white/20 py-4 text-lg font-bold text-white active:scale-[0.98]"
        >
          חזרה למפה
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
