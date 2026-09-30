import { Link } from 'react-router-dom'

const MAP_HEIGHT = 1400
const PIN_SIZE = 56

export default function WorldMap({ worlds }) {
  const sorted = [...worlds].sort((a, b) => a.order - b.order)
  const points = sorted.map((world) => ({
    world,
    x: world.mapPosition.x,
    y: (world.mapPosition.y / 100) * MAP_HEIGHT,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="relative mx-4 overflow-hidden rounded-3xl border border-white/10" style={{ height: MAP_HEIGHT }}>
      {/* רקע "מפת עולם" מאוירת - צורות עדינות, בלי תלות בנכס תמונה חיצוני */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#mapBg)" />
        <circle cx="15" cy="12" r="9" fill="rgba(255,255,255,0.03)" />
        <circle cx="80" cy="30" r="13" fill="rgba(255,255,255,0.03)" />
        <circle cx="25" cy="55" r="16" fill="rgba(255,255,255,0.03)" />
        <circle cx="75" cy="75" r="11" fill="rgba(255,255,255,0.03)" />
        <circle cx="20" cy="92" r="14" fill="rgba(255,255,255,0.03)" />
      </svg>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${MAP_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={linePath}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      </svg>

      {points.map(({ world, x, y }) => {
        const hasMissions = world.missions.length > 0
        const pin = (
          <div
            className="flex flex-col items-center gap-1"
            style={{ opacity: hasMissions ? 1 : 0.5 }}
          >
            <div
              className="flex shrink-0 items-center justify-center rounded-full border-4 border-white/20 text-lg font-extrabold shadow-lg transition active:scale-95"
              style={{
                width: PIN_SIZE,
                height: PIN_SIZE,
                backgroundColor: world.theme.accent,
                color: world.theme.secondary,
              }}
            >
              {hasMissions ? world.order : '🔒'}
            </div>
            <span className="max-w-[6.5rem] truncate text-center text-xs font-semibold text-white">
              {world.name}
            </span>
            {world.years && (
              <span className="max-w-[6.5rem] truncate text-center text-[10px] font-medium text-white/50">
                {world.years}
              </span>
            )}
          </div>
        )

        return (
          <div
            key={world.id}
            className="absolute"
            style={{ left: `${x}%`, top: y, transform: 'translate(-50%, -50%)' }}
          >
            {hasMissions ? <Link to={`/world/${world.id}`}>{pin}</Link> : pin}
          </div>
        )
      })}
    </div>
  )
}
