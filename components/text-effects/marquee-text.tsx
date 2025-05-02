"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

interface MarqueeTextProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
  repeat?: number
}

export default function MarqueeText({
  children,
  className = "",
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  repeat = 4,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const x = useMotionValue(0)

  useEffect(() => {
    if (!containerRef.current) return

    const calculateWidths = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const contentWidth = containerRef.current.scrollWidth / repeat

        setContainerWidth(containerWidth)
        setContentWidth(contentWidth)

        // Calculate duration based on content width and speed
        // The larger the content, the longer the duration
        const calculatedDuration = (contentWidth / speed) * 5
        setDuration(calculatedDuration)
      }
    }

    calculateWidths()

    const resizeObserver = new ResizeObserver(calculateWidths)
    resizeObserver.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [repeat, speed, children])

  // Create content array based on repeat count
  const content = Array(repeat).fill(children)

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? -contentWidth : contentWidth,
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
        style={{ x }}
      >
        {content.map((item, index) => (
          <div key={index} className="inline-block">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
