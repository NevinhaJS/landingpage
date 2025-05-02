"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface RevealTextProps {
  children: ReactNode
  className?: string
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  dark?: boolean
}

export default function RevealText({
  children,
  className = "",
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = true,
  dark = false,
}: RevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  const directionVariants = {
    up: {
      hidden: { y: "100%" },
      visible: { y: 0 },
    },
    down: {
      hidden: { y: "-100%" },
      visible: { y: 0 },
    },
    left: {
      hidden: { x: "100%" },
      visible: { x: 0 },
    },
    right: {
      hidden: { x: "-100%" },
      visible: { x: 0 },
    },
  }

  const selectedVariant = directionVariants[direction]

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${width === "fit-content" ? "inline-block" : "block"} ${className}`}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={selectedVariant}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className={`absolute inset-0 `}
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          duration: duration * 0.6,
          delay: delay + duration * 0.4,
          ease: "easeOut",
        }}
      />
    </div>
  )
}
