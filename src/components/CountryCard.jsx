import { motion } from 'framer-motion'
import { ArrowUpRight, Heart, MapPin } from 'lucide-react'

export default function CountryCard({ country, favorite, onFavorite, onExplore }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="glass group overflow-hidden rounded-2xl">
      <div className="relative h-44 overflow-hidden">
        <img src={country.image} alt={country.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <span className="absolute bottom-3 left-4 text-3xl">{country.flag}</span>
        <button onClick={() => onFavorite(country.name)} className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:text-pink-400" aria-label={`${favorite ? 'Remove' : 'Add'} ${country.name} favorite`}>
          <Heart size={18} fill={favorite ? '#f472b6' : 'none'} color={favorite ? '#f472b6' : 'white'} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between"><h3 className="text-lg font-bold">{country.name}</h3><span className="text-xs text-cyan-300">{country.continent}</span></div>
        <p className="flex items-center gap-2 text-sm text-slate-400"><MapPin size={14} />{country.capital}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{country.description}</p>
        <button onClick={() => onExplore(country)} className="mt-4 flex w-full items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20">Explore Country<ArrowUpRight size={17} /></button>
      </div>
    </motion.div>
  )
}
