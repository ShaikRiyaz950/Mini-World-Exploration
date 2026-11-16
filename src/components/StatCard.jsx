import { motion } from 'framer-motion'

export default function StatCard({ icon, label, value }) {
  return <motion.div whileHover={{ scale: 1.03 }} className="glass rounded-2xl p-5"><div className="mb-4 flex items-center justify-between"><span className="text-sm text-slate-400">{label}</span><span className="text-2xl">{icon}</span></div><h3 className="gradient-text text-3xl font-bold">{value}</h3></motion.div>
}
