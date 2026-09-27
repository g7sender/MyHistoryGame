import worlds from '../../data/worlds.js'
import WorldCard from '../ui/WorldCard.jsx'

export default function WorldsScreen() {
  const sortedWorlds = [...worlds].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-full bg-slate-950 pb-10">
      <header className="px-4 pb-6 pt-8 text-center text-white">
        <h1 className="text-2xl font-extrabold">מסע בזמן</h1>
        <p className="mt-1 text-sm text-white/60">בחרו עולם היסטורי והתחילו לגלות</p>
      </header>
      <main className="flex flex-col gap-3 px-4">
        {sortedWorlds.map((world) => (
          <WorldCard key={world.id} world={world} />
        ))}
      </main>
    </div>
  )
}
