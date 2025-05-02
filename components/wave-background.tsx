"use client"

import { useEffect, useRef } from "react"

interface WaveBackgroundProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  speed?: number
  amplitude?: number
  frequency?: number
  layers?: number
  opacity?: number
}

export default function WaveBackground({
  className = "",
  primaryColor = "#9333ea", // Purple-600
  secondaryColor = "#db2777", // Pink-600
  speed = 0.5,
  amplitude = 25,
  frequency = 0.005,
  layers = 3,
  opacity = 0.15,
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Redraw immediately after resize to prevent flicker
      drawWaves(0)
    }

    // Parse colors to RGBA format
    const parseColor = (color: string, alpha: number): string => {
      // Handle hex colors
      if (color.startsWith("#")) {
        const r = Number.parseInt(color.slice(1, 3), 16)
        const g = Number.parseInt(color.slice(3, 5), 16)
        const b = Number.parseInt(color.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
      }
      return color
    }

    // Create gradient colors with opacity
    const primaryRGBA = parseColor(primaryColor, opacity)
    const secondaryRGBA = parseColor(secondaryColor, opacity)

    // Wave parameters for each layer
    const waveParams = Array.from({ length: layers }, (_, i) => ({
      amplitude: amplitude * (1 - i * 0.2), // Decreasing amplitude for each layer
      frequency: frequency * (1 + i * 0.1), // Slightly increasing frequency
      speed: speed * (1 - i * 0.1), // Slightly decreasing speed
      phase: Math.random() * Math.PI * 2, // Random starting phase
      color: i % 2 === 0 ? primaryRGBA : secondaryRGBA,
    }))

    // Draw waves function
    const drawWaves = (timestamp: number) => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw each wave layer
      waveParams.forEach((wave, index) => {
        const { amplitude, frequency, speed, phase, color } = wave

        // Update phase based on time
        wave.phase += speed * 0.01

        ctx.beginPath()

        // Start at the left edge, slightly below the top
        ctx.moveTo(0, canvas.height * 0.5)

        // Draw the wave path
        for (let x = 0; x < canvas.width; x += 5) {
          // Step by 5px for performance
          // Calculate y position based on sine wave
          const y =
            canvas.height * 0.5 + // Center vertically
            Math.sin(x * frequency + wave.phase) * amplitude + // Main wave
            Math.sin(x * frequency * 2 + wave.phase * 1.5) * (amplitude * 0.3) // Secondary wave for complexity

          ctx.lineTo(x, y)
        }

        // Complete the path to form a shape
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        // Fill with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, primaryRGBA)
        gradient.addColorStop(1, secondaryRGBA)

        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Request next frame
      requestRef.current = requestAnimationFrame(drawWaves)
    }

    // Initial setup
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    requestRef.current = requestAnimationFrame(drawWaves)

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [primaryColor, secondaryColor, speed, amplitude, frequency, layers, opacity])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-5 ${className}`} />
}
