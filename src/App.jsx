import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Globe2, Heart, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import CountryCard from './components/CountryCard'
import Globe3D from './components/Globe3D'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import { continents, countries } from './data/countries'

export default function App() {
  const [active, setActive] = useState('Overview')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('world-favorites')) || [] } catch { return [] }
  })
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleFavorite(name) {
    setFavorites((previous) => {
      const updated = previous.includes(name) ? previous.filter((item) => item !== name) : [...previous, name]
      localStorage.setItem('world-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const filteredCountries = useMemo(() => countries.filter((country) => {
    const query = search.toLowerCase()
    const matchesSearch = country.name.toLowerCase().includes(query) || country.capital.toLowerCase().includes(query) || country.continent.toLowerCase().includes(query)
    return matchesSearch && (filter === 'All' || country.continent === filter) && (active !== 'Favorites' || favorites.includes(country.name))
  }), [active, favorites, filter, search])

  const filters = ['All', ...new Set(countries.map((country) => country.continent))]

  function selectContinent(name) {
    setFilter(name)
    setSearch('')
    setActive('Countries')
  }

  function renderCountries() {
    return (
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold">{active === 'Favorites' ? 'Your Favorites' : 'Explore Countries'}</h2><p className="mt-1 text-sm text-slate-400">Discover amazing places around the world.</p></div>
          <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">{filteredCountries.length} countries</span>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm transition ${filter === item ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>{item}</button>)}</div>
        {filteredCountries.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredCountries.map((country) => <CountryCard key={country.name} country={country} favorite={favorites.includes(country.name)} onFavorite={toggleFavorite} onExplore={setSelectedCountry} />)}</div> : <div className="glass rounded-2xl p-12 text-center"><Globe2 size={42} className="mx-auto mb-4 text-slate-500" /><h3 className="text-lg font-semibold">No countries found</h3><p className="mt-2 text-sm text-slate-400">Try another search or change the continent filter.</p><button onClick={() => { setSearch(''); setFilter('All') }} className="mt-4 text-cyan-300">Clear filters</button></div>}
      </section>
    )
  }

  function renderContinents() {
    return <section><h2 className="mb-2 text-2xl font-bold">Explore Continents</h2><p className="mb-7 text-sm text-slate-400">Seven continents, countless discoveries.</p><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{continents.map((continent) => <motion.button key={continent.name} whileHover={{ y: -5 }} onClick={() => selectContinent(continent.name)} className="glass group overflow-hidden rounded-2xl text-left"><div className="relative h-48"><img src={continent.image} alt={continent.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-4 left-4"><span className="text-3xl">{continent.emoji}</span><h3 className="mt-2 text-xl font-bold">{continent.name}</h3><p className="text-sm text-slate-300">{continent.countries} countries</p></div></div></motion.button>)}</div></section>
  }

  function renderDetails() {
    if (!selectedCountry) return null
    return <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass my-auto w-full max-w-2xl overflow-hidden rounded-3xl">
        <div className="relative h-64"><img src={selectedCountry.image} alt={selectedCountry.name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" /><button onClick={() => setSelectedCountry(null)} className="absolute right-4 top-4 rounded-full bg-black/60 p-2" aria-label="Close country details"><X /></button><div className="absolute bottom-5 left-6"><span className="text-4xl">{selectedCountry.flag}</span><h2 className="mt-2 text-3xl font-bold">{selectedCountry.name}</h2></div></div>
        <div className="p-6"><p className="leading-7 text-slate-300">{selectedCountry.description}</p><div className="mt-6 grid grid-cols-2 gap-4">{[['Capital', selectedCountry.capital], ['Continent', selectedCountry.continent], ['Population', selectedCountry.population], ['Currency', selectedCountry.currency], ['Language', selectedCountry.language]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/5 p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-sm font-semibold">{value}</p></div>)}</div><button onClick={() => toggleFavorite(selectedCountry.name)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 font-bold text-slate-950 hover:bg-cyan-300"><Heart size={18} fill={favorites.includes(selectedCountry.name) ? 'currentColor' : 'none'} />{favorites.includes(selectedCountry.name) ? 'Remove from Favorites' : 'Add to Favorites'}</button></div>
      </motion.div>
    </div>
  }

  return <div className="min-h-screen">
    <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    <main className="min-h-screen px-5 py-6 md:ml-64 md:px-8 lg:px-10"><Navbar search={search} setSearch={setSearch} setMobileOpen={setMobileOpen} />
      <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
        {active === 'Overview' && <><section className="glass glow relative mb-8 overflow-hidden rounded-3xl p-6 md:p-10"><div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" /><div className="relative grid items-center gap-5 lg:grid-cols-2"><div><span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300">✦ YOUR GLOBAL ADVENTURE STARTS HERE</span><h1 className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl">Discover Our<br /><span className="gradient-text">Beautiful World.</span></h1><p className="mt-5 max-w-md leading-7 text-slate-400">Explore amazing countries, diverse cultures, incredible landscapes and hidden wonders. Your journey begins here.</p><button onClick={() => setActive('Explore Globe')} className="mt-7 flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Start Exploring <ArrowRight size={18} /></button></div><Globe3D /></div></section><div className="mb-9 grid grid-cols-2 gap-4 lg:grid-cols-4"><StatCard icon="🌍" label="Continents" value="7" /><StatCard icon="🏳️" label="Countries" value="195" /><StatCard icon="🌊" label="Oceans" value="5" /><StatCard icon="❤️" label="Favorites" value={favorites.length} /></div><div className="mb-8">{renderCountries()}</div><div><div className="mb-5 flex items-center justify-between"><div><h2 className="text-2xl font-bold">Explore Continents</h2><p className="mt-1 text-sm text-slate-400">Choose your next destination.</p></div><button onClick={() => setActive('Continents')} className="text-sm text-cyan-300">View All →</button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{continents.slice(0, 3).map((item) => <button key={item.name} onClick={() => selectContinent(item.name)} className="glass rounded-2xl p-5 text-left transition hover:border-cyan-400/40"><span className="text-3xl">{item.emoji}</span><h3 className="mt-3 font-bold">{item.name}</h3><p className="mt-1 text-sm text-slate-400">{item.countries} countries</p></button>)}</div></div></>}
        {active === 'Explore Globe' && <section className="glass glow rounded-3xl p-5 md:p-10"><h2 className="text-3xl font-bold">Explore the Globe</h2><p className="mt-2 text-slate-400">Drag to rotate the globe and scroll to zoom in.</p><Globe3D /></section>}
        {active === 'Continents' && renderContinents()}
        {(active === 'Countries' || active === 'Favorites') && renderCountries()}
      </motion.div></AnimatePresence>
    </main>
    {renderDetails()}
  </div>
}
