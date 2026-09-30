import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import CompanionBadge from './CompanionBadge.jsx'

function GainBubble({ amount }) {
  if (!amount) return null
  return (
    <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
      <motion.span
        initial={{ opacity: 0, y: 0, scale: 0.8 }}
        animate={{ opacity: 1, y: -22, scale: 1 }}
        exit={{ opacity: 0, y: -34 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="block text-xs font-extrabold text-green-400"
      >
        +{amount}
      </motion.span>
    </span>
  )
}

export default function PlayerStatsBar() {
  const { hearts, xp, coins, streak, lastGain } = useGameProgress()
  const [activeGain, setActiveGain] = useState(null)

  useEffect(() => {
    if (!lastGain || !lastGain.correct) return
    setActiveGain(lastGain)
    const timer = setTimeout(() => setActiveGain(null), 700)
    return () => clearTimeout(timer)
  }, [lastGain])

  return (
    <div className="flex items-center justify-between gap-2 bg-black/20 px-4 py-2 text-sm font-bold text-white">
      <CompanionBadge />
      <div className="flex flex-1 items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <span>❤️</span>
          <span>{hearts}</span>
        </span>
        <span className="relative flex items-center gap-1">
          <span>⭐</span>
          <span>{xp}</span>
          <AnimatePresence>
            {activeGain?.xpGained ? <GainBubble key={activeGain.id} amount={activeGain.xpGained} /> : null}
          </AnimatePresence>
        </span>
        <span className="relative flex items-center gap-1">
          <span>🪙</span>
          <span>{coins}</span>
          <AnimatePresence>
            {activeGain?.coinsGained ? <GainBubble key={activeGain.id} amount={activeGain.coinsGained} /> : null}
          </AnimatePresence>
        </span>
        {streak > 0 && (
          <span className="flex items-center gap-1">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            >
              🔥
            </motion.span>
            <span>{streak}</span>
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Link to="/book" aria-label="ספר ההיסטוריה" className="text-lg active:scale-90">
          📖
        </Link>
        <Link to="/figures" aria-label="דמויות היסטוריות" className="text-lg active:scale-90">
          🏛️
        </Link>
      </div>
    </div>
  )
}
