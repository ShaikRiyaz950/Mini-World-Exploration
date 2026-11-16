import { Compass, Globe2, Heart, LayoutDashboard, Map, X } from 'lucide-react'

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Explore Globe', icon: Globe2 },
  { name: 'Continents', icon: Map },
  { name: 'Countries', icon: Compass },
  { name: 'Favorites', icon: Heart },
]

export default function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`glass fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 p-5 transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><Globe2 size={27} /></div>
            <div><h1 className="text-lg font-bold tracking-wider">MINI WORLD</h1><p className="text-xs text-cyan-400">EXPLORE THE EARTH</p></div>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button>
        </div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Menu</p>
        <nav className="flex flex-col gap-2">
          {navigation.map(({ name, icon: Icon }) => (
            <button key={name} onClick={() => { setActive(name); setMobileOpen(false) }} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${active === name ? 'bg-cyan-400/15 text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={19} />{name}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
          <Globe2 className="mb-3 text-cyan-400" size={25} />
          <p className="text-sm font-semibold">Keep Exploring</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">There is always something new to discover.</p>
        </div>
        <p className="mt-5 text-center text-xs text-slate-600">MINI WORLD EXPLORER © 2026</p>
      </aside>
    </>
  )
}
