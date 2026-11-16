import { Bell, Menu, Search } from 'lucide-react'

export default function Navbar({ search, setSearch, setMobileOpen }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/10 p-2 md:hidden" aria-label="Open menu"><Menu size={21} /></button>
        <div><p className="text-sm text-slate-400">Your world awaits</p><h2 className="text-xl font-bold">Explore the World</h2></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex w-full max-w-64 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <Search size={18} className="text-slate-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search countries..." aria-label="Search countries" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-500" />
        </div>
        <button className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/10" aria-label="Notifications"><Bell size={19} /></button>
      </div>
    </header>
  )
}
