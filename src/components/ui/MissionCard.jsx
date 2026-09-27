import { Link } from 'react-router-dom'

export default function MissionCard({ world, mission, index, unlocked, completed }) {
  const content = (
    <div
      className={`flex items-center gap-3 rounded-xl border p-4 transition ${
        completed
          ? 'border-[var(--world-accent)] bg-[var(--world-accent)]/10'
          : unlocked
            ? 'border-white/15 bg-white/5 active:scale-[0.98]'
            : 'border-white/5 bg-white/[0.02] opacity-50'
      }`}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
        style={{
          backgroundColor: completed ? 'var(--world-accent)' : 'rgba(255,255,255,0.1)',
          color: completed ? 'var(--world-secondary)' : 'white',
        }}
      >
        {completed ? '✓' : unlocked ? index + 1 : '🔒'}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white">{mission.title}</h3>
        <p className="text-xs text-white/60">
          {completed ? 'הושלם' : unlocked ? 'פתוח' : 'השלימו את המשימה הקודמת כדי לפתוח'}
        </p>
      </div>
    </div>
  )

  if (!unlocked) {
    return content
  }

  return <Link to={`/world/${world.id}/mission/${mission.id}/story`}>{content}</Link>
}
