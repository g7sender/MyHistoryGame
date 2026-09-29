import worlds from '../../data/worlds.js'
import { useGameProgress } from '../../state/GameProgressContext.jsx'
import TopBar from '../ui/TopBar.jsx'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'

export default function HistoryBookScreen() {
  const { isWorldCompleted } = useGameProgress()
  const sortedWorlds = [...worlds].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-full bg-slate-950 pb-10">
      <TopBar title="📖 ספר ההיסטוריה" subtitle="פרק לכל עולם שכבשתם" />
      <PlayerStatsBar />
      <main className="flex flex-col gap-3 px-4 pt-4">
        {sortedWorlds.map((world) => {
          const completed = isWorldCompleted(world)
          return (
            <div
              key={world.id}
              className="overflow-hidden rounded-2xl border border-white/10 p-4"
              style={
                completed
                  ? { background: `linear-gradient(135deg, ${world.theme.primary}, ${world.theme.secondary})` }
                  : undefined
              }
            >
              <span className="text-xs font-medium text-white/60">פרק {world.order}</span>
              {completed ? (
                <>
                  <h2 className="text-lg font-extrabold text-white">{world.name}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{world.whyItMatters}</p>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  <div className="min-w-0">
                    <h2 className="select-none truncate text-lg font-extrabold text-white/30 blur-[2px]">
                      {world.name}
                    </h2>
                    <p className="text-xs text-white/40">
                      פרק נעול - השלימו את משימות העולם ואת הבוס שלו כדי לפתוח
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </main>
    </div>
  )
}
