import { useState } from 'react'

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
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="miniMapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#miniMapBg)" />
        <circle cx="20" cy="30" r="14" fill="rgba(255,255,255,0.04)" />
        <circle cx="75" cy="65" r="18" fill="rgba(255,255,255,0.04)" />
        <circle cx="45" cy="80" r="10" fill="rgba(255,255,255,0.04)" />
      </svg>

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
