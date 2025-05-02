"use client"

import { motion } from "framer-motion"

interface StaggeredTextProps {
  children: string
  className?: string
  wordClassName?: string
  delay?: number
  staggerDelay?: number
  duration?: number
  animation?: "fadeIn" | "fadeUp" | "scale" | "slide"
}

export default function StaggeredText({
  children,
  className = "",
  wordClassName = "",
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.5,
  animation = "fadeUp",
}: StaggeredTextProps) {
  // Split text into words
  const words = children.split(" ")

  // Define animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    slide: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
  }

  const selectedAnimation = animations[animation]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`inline-block ${wordClassName}`}
          variants={selectedAnimation}
          transition={{
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.div>
  )
}
