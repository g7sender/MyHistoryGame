import worlds from '../../data/worlds.js'
import companionStages from '../../data/companionStages.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'

export default function CompanionBadge() {
  const { isWorldCompleted } = useGameProgress()
  const completedCount = worlds.filter(isWorldCompleted).length
  const stage = companionStages[Math.min(completedCount, companionStages.length - 1)]

  return (
    <span className="flex items-center gap-1" title={stage.label}>
      <span className="text-base">{stage.icon}</span>
      <span className="hidden text-xs font-semibold text-white/70 sm:inline">{stage.label}</span>
    </span>
  )
}
