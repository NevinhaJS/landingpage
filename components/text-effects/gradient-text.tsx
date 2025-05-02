"use client"

import { motion } from "framer-motion"
import { type ReactNode, useState, useEffect } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  duration?: number
  delay?: number
}

export default function GradientText({
  children,
  className = "",
  from = "from-blue-400",
  via = "via-cyan-500",
  to = "to-emerald-500",
  animate = true,
  duration = 5,
  delay = 0,
}: GradientTextProps) {
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    if (!animate) return

    let animationFrame: number
    let startTime: number | null = null

    const animateGradient = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Calculate angle based on elapsed time
      const angle = ((elapsed / 1000) * 30) % 360
      setGradientAngle(angle)

      animationFrame = requestAnimationFrame(animateGradient)
    }

    // Delay the start of animation
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animateGradient)
    }, delay * 1000)

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(timeoutId)
    }
  }, [animate, delay])

  const gradientStyle = animate
    ? {
        backgroundImage: `linear-gradient(${gradientAngle}deg, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
        "--gradient-from": "rgb(56, 189, 248)", // blue-400/sky-400
        "--gradient-via": "rgb(6, 182, 212)", // cyan-500
        "--gradient-to": "rgb(16, 185, 129)", // emerald-500
      }
    : {}

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={`bg-clip-text text-transparent bg-gradient-to-r ${from} ${via} ${to} ${className}`}
      style={animate ? gradientStyle : {}}
    >
      {children}
    </motion.span>
  )
}
