import { Link } from 'react-router-dom'

export default function WorldCard({ world }) {
  const hasMissions = world.missions.length > 0

  return (
    <Link
      to={hasMissions ? `/world/${world.id}` : '#'}
      aria-disabled={!hasMissions}
      className="block overflow-hidden rounded-2xl border border-white/10 shadow-lg transition active:scale-[0.98]"
      style={{
        background: `linear-gradient(135deg, ${world.theme.primary}, ${world.theme.secondary})`,
        pointerEvents: hasMissions ? 'auto' : 'none',
        opacity: hasMissions ? 1 : 0.5,
      }}
    >
      <div className="flex items-center justify-between gap-3 p-4 text-white">
        <div className="min-w-0">
          <span className="text-xs font-medium text-white/70">עולם {world.order}</span>
          <h2 className="truncate text-xl font-extrabold">{world.name}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-white/80">{world.subtitle}</p>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold"
          style={{ backgroundColor: world.theme.accent, color: world.theme.secondary }}
        >
          {world.order}
        </span>
      </div>
      {!hasMissions && (
        <p className="bg-black/20 px-4 py-2 text-xs text-white/70">בקרוב - תוכן בהכנה</p>
      )}
    </Link>
  )
}
