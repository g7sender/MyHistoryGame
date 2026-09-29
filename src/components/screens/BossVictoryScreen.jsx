import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getWorldById } from '../../data/worlds.js'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'

export default function BossVictoryScreen() {
  const { worldId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const world = getWorldById(worldId)

  if (!world || !world.boss) return <Navigate to="/" replace />
  // המסך הזה מגיע רק מניווט פנימי מייד אחרי סיום האתגר (state בזיכרון) - גישה ישירה
  // (או רענון) שולחת בחזרה ללוח המשימות, כי אין ציון לשחזר.
  if (!location.state) return <Navigate to={`/world/${world.id}`} replace />

  const { correctCount, total } = location.state

  return (
    <div
      className="flex min-h-full flex-col items-center pb-6 text-center"
      style={{
        '--world-primary': world.theme.primary,
        '--world-secondary': world.theme.secondary,
        '--world-accent': world.theme.accent,
        background: `linear-gradient(180deg, ${world.theme.secondary} 0%, #0f172a 320px)`,
      }}
    >
      <TopBar title="ניצחון!" subtitle={world.name} onBack={false} />
      <PlayerStatsBar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-6">
        <div className="text-7xl">🏆</div>
        <h2 className="mt-4 text-2xl font-extrabold text-white">כבשת את {world.boss.title}!</h2>
        <p className="mt-2 text-white/80">
          ענית נכון על {correctCount} מתוך {total} שאלות
        </p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
          {world.name} עכשיו רשום כפרק שלם בספר ההיסטוריה שלך.
        </p>
      </main>
      <div className="flex w-full flex-col gap-3 px-4 pt-6">
        <button
          type="button"
          onClick={() => navigate('/book')}
          className="w-full rounded-xl py-4 text-lg font-bold text-slate-900 shadow-lg active:scale-[0.98]"
          style={{ backgroundColor: world.theme.accent }}
        >
          📖 לספר ההיסטוריה
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full rounded-xl border border-white/20 py-4 text-lg font-bold text-white active:scale-[0.98]"
        >
          חזרה למפה
        </button>
      </div>
    </div>
  )
}
