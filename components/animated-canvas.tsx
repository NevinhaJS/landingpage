"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function AnimatedCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasRef.current.appendChild(renderer.domElement)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100
      posArray[i + 1] = (Math.random() - 0.5) * 100
      posArray[i + 2] = (Math.random() - 0.5) * 100

      // Scale
      scaleArray[i / 3] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add some colored lights
    const purpleLight = new THREE.PointLight(0x9c27b0, 10, 100)
    purpleLight.position.set(-30, 20, 30)
    scene.add(purpleLight)

    const pinkLight = new THREE.PointLight(0xe91e63, 10, 100)
    pinkLight.position.set(30, -20, 30)
    scene.add(pinkLight)

    // Animation
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
    }

    const onDocumentTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        mouseX = event.touches[0].pageX - windowHalfX
        mouseY = event.touches[0].pageY - windowHalfY
      }
    }

    const onDocumentTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        mouseX = event.touches[0].pageX - windowHalfX
        mouseY = event.touches[0].pageY - windowHalfY
      }
    }

    document.addEventListener("mousemove", onDocumentMouseMove)
    document.addEventListener("touchstart", onDocumentTouchStart)
    document.addEventListener("touchmove", onDocumentTouchMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth follow for mouse movement
      targetX = mouseX * 0.001
      targetY = mouseY * 0.001

      particlesMesh.rotation.x += 0.01 * (targetY - particlesMesh.rotation.x)
      particlesMesh.rotation.y += 0.01 * (targetX - particlesMesh.rotation.y)

      // Slow rotation regardless of mouse
      particlesMesh.rotation.z = elapsedTime * 0.05

      // Pulsing effect
      const scales = particlesGeometry.attributes.scale.array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        const y = particlesGeometry.attributes.position.array[i3 + 1]
        const z = particlesGeometry.attributes.position.array[i3 + 2]

        const dist = Math.sqrt(x * x + y * y + z * z)
        scales[i] = Math.sin(elapsedTime + dist) * 0.5 + 0.5
      }
      particlesGeometry.attributes.scale.needsUpdate = true

      // Move lights
      purpleLight.position.x = Math.sin(elapsedTime * 0.5) * 30
      purpleLight.position.y = Math.cos(elapsedTime * 0.3) * 30

      pinkLight.position.x = Math.cos(elapsedTime * 0.5) * 30
      pinkLight.position.y = Math.sin(elapsedTime * 0.3) * 30

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", onDocumentMouseMove)
      document.removeEventListener("touchstart", onDocumentTouchStart)
      document.removeEventListener("touchmove", onDocumentTouchMove)
    }
  }, [])

  return <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
