import { motion } from 'framer-motion'
import worlds from '../../data/worlds.js'
import companionStages from '../../data/companionStages.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'

export default function CompanionBadge() {
  const { isWorldCompleted } = useGameProgress()
  const completedCount = worlds.filter(isWorldCompleted).length
  const stage = companionStages[Math.min(completedCount, companionStages.length - 1)]

  return (
    <span className="flex items-center gap-1" title={stage.label}>
      <motion.span
        key={stage.icon}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="text-base"
      >
        {stage.icon}
      </motion.span>
      <span className="hidden text-xs font-semibold text-white/70 sm:inline">{stage.label}</span>
    </span>
  )
}
