"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ServiceItemProps {
  icon: ReactNode
  title: string
  description: string
  index: number
}

export default function ServiceItem({ icon, title, description, index }: ServiceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 group"
    >
      <div className="mb-4 text-blue-400 group-hover:text-emerald-400 transition-colors duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  )
}
