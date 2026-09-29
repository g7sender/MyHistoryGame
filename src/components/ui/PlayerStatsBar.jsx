import { Link } from 'react-router-dom'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import CompanionBadge from './CompanionBadge.jsx'

export default function PlayerStatsBar() {
  const { hearts, xp, coins, streak } = useGameProgress()

  return (
    <div className="flex items-center justify-between gap-2 bg-black/20 px-4 py-2 text-sm font-bold text-white">
      <CompanionBadge />
      <div className="flex flex-1 items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <span>❤️</span>
          <span>{hearts}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>⭐</span>
          <span>{xp}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>🪙</span>
          <span>{coins}</span>
        </span>
        {streak > 0 && (
          <span className="flex items-center gap-1">
            <span>🔥</span>
            <span>{streak}</span>
          </span>
        )}
      </div>
      <Link to="/book" aria-label="ספר ההיסטוריה" className="text-lg active:scale-90">
        📖
      </Link>
    </div>
  )
}
