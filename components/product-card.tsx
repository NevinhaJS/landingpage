"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProductCardProps {
  title: string
  description: string
  image: string
  color: string
  index: number
}

export default function ProductCard({ title, description, image, color, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group"
    >
      <div className="relative h-48">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover mix-blend-overlay" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </motion.div>
  )
}
