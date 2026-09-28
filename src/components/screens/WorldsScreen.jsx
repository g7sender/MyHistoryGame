import worlds from '../../data/worlds.js'
import PlayerStatsBar from '../ui/PlayerStatsBar.jsx'
import WorldMap from '../ui/WorldMap.jsx'

export default function WorldsScreen() {
  return (
    <div className="min-h-full bg-slate-950 pb-10">
      <header className="px-4 pb-4 pt-8 text-center text-white">
        <h1 className="text-2xl font-extrabold">מסע בזמן</h1>
        <p className="mt-1 text-sm text-white/60">בחרו עולם היסטורי והתחילו לגלות</p>
      </header>
      <PlayerStatsBar />
      <main className="pt-4">
        <WorldMap worlds={worlds} />
      </main>
    </div>
  )
}
