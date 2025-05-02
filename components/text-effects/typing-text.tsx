"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface TypingTextProps {
  text: string
  className?: string
  cursorClassName?: string
  typingSpeed?: number
  delay?: number
  showCursor?: boolean
  loop?: boolean
  pauseTime?: number
}

export default function TypingText({
  text,
  className = "",
  cursorClassName = "",
  typingSpeed = 50,
  delay = 0,
  showCursor = true,
  loop = false,
  pauseTime = 2000,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const cursorControls = useAnimation()

  useEffect(() => {
    cursorControls.start({
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    })
  }, [cursorControls])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const startTyping = () => {
      if (isPaused) {
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseTime)
        return
      }

      if (!isDeleting && currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, typingSpeed)
      } else if (!isDeleting && currentIndex >= text.length) {
        if (loop) {
          setIsPaused(true)
        }
      } else if (isDeleting && currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        }, typingSpeed / 2)
      } else if (isDeleting && currentIndex <= 0) {
        setIsDeleting(false)
      }
    }

    // Initial delay
    if (displayedText === "" && currentIndex === 0 && !isDeleting && delay > 0) {
      timeout = setTimeout(startTyping, delay)
    } else {
      startTyping()
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, displayedText, isDeleting, isPaused, loop, pauseTime, text, typingSpeed])

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {showCursor && (
        <motion.span className={`inline-block ${cursorClassName}`} animate={cursorControls}>
          |
        </motion.span>
      )}
    </span>
  )
}
