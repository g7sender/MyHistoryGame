import { Link, useNavigate } from 'react-router-dom'

export default function TopBar({ title, subtitle, onBack }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[var(--world-secondary,#0f172a)] px-4 py-4 text-white shadow-md">
      <div className="flex min-w-0 items-center gap-3">
        {onBack !== false && (
          <button
            type="button"
            onClick={() => (onBack ? onBack() : navigate(-1))}
            aria-label="חזרה"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg active:bg-white/20"
          >
            →
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold">{title}</h1>
          {subtitle && <p className="truncate text-sm text-white/70">{subtitle}</p>}
        </div>
      </div>
      <Link
        to="/"
        aria-label="חזרה למסך הראשי - מסע בזמן"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg active:bg-white/20"
      >
        🏠
      </Link>
    </header>
  )
}
