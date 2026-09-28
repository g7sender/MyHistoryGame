import { useGameProgress } from '../../state/GameProgressContext.jsx'

export default function PlayerStatsBar() {
  const { hearts, xp, coins, streak } = useGameProgress()

  return (
    <div className="flex items-center justify-center gap-4 bg-black/20 px-4 py-2 text-sm font-bold text-white">
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
  )
}
