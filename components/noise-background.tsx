"use client"

import { useEffect, useRef } from "react"

interface NoiseBackgroundProps {
  className?: string
  color?: string
  opacity?: number
  speed?: number
  density?: number
}

export default function NoiseBackground({
  className = "",
  color = "#9333ea", // Purple-600
  opacity = 0.07,
  speed = 0.003,
  density = 80,
}: NoiseBackgroundProps) {
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
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create noise data
    const createNoiseData = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Only update a subset of pixels each frame for better performance
      const pixelCount = canvas.width * canvas.height
      const updateCount = Math.floor(pixelCount * 0.1) // Update 10% of pixels each frame

      for (let i = 0; i < updateCount; i++) {
        // Pick random pixels to update
        const randomIndex = Math.floor(Math.random() * pixelCount)
        const dataIndex = randomIndex * 4

        // Random noise value
        const value = Math.random() > 0.5 ? 255 : 0

        // Set RGBA values
        data[dataIndex] = value // R
        data[dataIndex + 1] = value // G
        data[dataIndex + 2] = value // B
        data[dataIndex + 3] = Math.random() * opacity * 255 // A (with opacity)
      }

      return imageData
    }

    // Parse color to RGB
    const parseColor = (color: string): [number, number, number] => {
      // Handle hex colors
      if (color.startsWith("#")) {
        const r = Number.parseInt(color.slice(1, 3), 16)
        const g = Number.parseInt(color.slice(3, 5), 16)
        const b = Number.parseInt(color.slice(5, 7), 16)
        return [r, g, b]
      }

      // Default to purple
      return [147, 51, 234]
    }

    const [r, g, b] = parseColor(color)

    // Create noise points
    const points: { x: number; y: number; vx: number; vy: number; size: number }[] = []

    for (let i = 0; i < density; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 10,
        vy: (Math.random() - 0.5) * speed * 10,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent black
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw noise points
      for (const point of points) {
        // Update position
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.fill()
      }

      // Static noise overlay (very subtle)
      if (Math.random() > 0.7) {
        // Only update sometimes for performance
        const noiseData = createNoiseData()
        ctx.globalCompositeOperation = "lighter"
        ctx.putImageData(noiseData, 0, 0)
        ctx.globalCompositeOperation = "source-over"
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [color, opacity, speed, density])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-5 ${className}`} />
}
