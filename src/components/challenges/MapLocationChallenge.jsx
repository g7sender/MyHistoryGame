import { useState } from 'react'
import WorldAtlasBackground from '../ui/WorldAtlasBackground.jsx'

// challenge.points - מערך {label, x, y, correct} (אחוזים על מפה מאוירת מוקטנת).
export default function MapLocationChallenge({ challenge, onAnswered }) {
  const [selectedLabel, setSelectedLabel] = useState(null)
  const hasAnswered = selectedLabel !== null

  function handleClick(point) {
    if (hasAnswered) return
    setSelectedLabel(point.label)
    onAnswered(point.correct)
  }

  function pinClasses(point) {
    if (!hasAnswered) return 'border-white/30 bg-white/10'
    if (point.correct) return 'border-2 border-green-400 bg-green-500/40'
    if (point.label === selectedLabel) return 'border-2 border-red-400 bg-red-500/40'
    return 'border-white/30 bg-white/10 opacity-50'
  }

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/10">
      <WorldAtlasBackground />

      {challenge.points.map((point) => (
        <div
          key={point.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <button
            type="button"
            disabled={hasAnswered}
            onClick={() => handleClick(point)}
            aria-label={point.label}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg shadow-lg transition active:scale-95 ${pinClasses(point)}`}
          >
            📍
          </button>
          <span className="whitespace-nowrap text-xs font-semibold text-white drop-shadow">{point.label}</span>
        </div>
      ))}
    </div>
  )
}
