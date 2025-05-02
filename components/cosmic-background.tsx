"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useFrame, Canvas, extend, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import { useMotionValue, useSpring } from "framer-motion"

// Shader para as nebulosas
const NebulaShaderMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    mousePosition: new THREE.Vector2(0, 0),
    colorA: new THREE.Color("#9c27b0"),
    colorB: new THREE.Color("#e91e63"),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mousePosition;
    uniform vec3 colorA;
    uniform vec3 colorB;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Simplex 3D Noise
    // by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      // Permutations
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      // Gradients
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }
    
    void main() {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = vUv;
      
      // Mouse influence
      float mouseInfluence = smoothstep(1.0, 0.0, length(mousePosition - uv) * 2.0);
      
      // Noise layers
      float noise1 = snoise(vec3(uv * 3.0, time * 0.1)) * 0.5 + 0.5;
      float noise2 = snoise(vec3(uv * 6.0, time * 0.2 + 100.0)) * 0.5 + 0.5;
      float noise3 = snoise(vec3(uv * 12.0, time * 0.3 + 300.0)) * 0.5 + 0.5;
      
      // Combine noise layers
      float finalNoise = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;
      finalNoise = pow(finalNoise, 1.5);
      
      // Add mouse influence
      finalNoise = mix(finalNoise, finalNoise * 1.5, mouseInfluence);
      
      // Color gradient based on noise
      vec3 color = mix(colorA, colorB, finalNoise);
      
      // Adjust opacity based on noise
      float opacity = smoothstep(0.1, 0.9, finalNoise) * 0.5;
      
      gl_FragColor = vec4(color, opacity);
    }
  `,
)

// Shader para o modelo 3D com distorção
const DistortionShaderMaterial = shaderMaterial(
  {
    time: 0,
    mousePosition: new THREE.Vector2(0, 0),
    distortionIntensity: 0.3,
    colorA: new THREE.Color("#9c27b0"),
    colorB: new THREE.Color("#e91e63"),
    colorC: new THREE.Color("#00bcd4"),
  },
  // Vertex Shader
  `
    uniform float time;
    uniform vec2 mousePosition;
    uniform float distortionIntensity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Simplex 3D Noise
    // by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      // Permutations
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      // Gradients
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      // Calculate distortion
      float noise1 = snoise(vec3(position.x * 2.0, position.y * 2.0, position.z * 2.0 + time * 0.2)) * distortionIntensity;
      float noise2 = snoise(vec3(position.x * 4.0 + 100.0, position.y * 4.0 + 100.0, position.z * 4.0 + 100.0 + time * 0.3)) * distortionIntensity * 0.5;
      
      // Mouse influence
      vec2 normalizedMousePos = mousePosition * 2.0 - 1.0;
      float mouseDistance = length(normalizedMousePos - vec2(position.x, position.y) * 0.5) * 2.0;
      float mouseInfluence = smoothstep(1.0, 0.0, mouseDistance) * distortionIntensity;
      
      // Apply distortion
      vec3 distortedPosition = position;
      distortedPosition += normal * (noise1 + noise2);
      
      // Apply mouse influence
      distortedPosition += normal * mouseInfluence * sin(time * 2.0) * 0.2;
      
      // Glitch effect
      float glitchIntensity = 0.05;
      float glitchTime = floor(time * 10.0) / 10.0;
      float glitchNoise = snoise(vec3(glitchTime * 100.0, glitchTime * 100.0, glitchTime * 100.0));
      
      if (glitchNoise > 0.95) {
        distortedPosition.x += sin(position.y * 100.0) * glitchIntensity;
      }
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
      
      // Color based on position and time
      float colorMix = sin(vPosition.x * 2.0 + time * 0.5) * 0.5 + 0.5;
      vec3 baseColor = mix(colorA, colorB, colorMix);
      
      // Add fresnel effect
      vec3 finalColor = mix(baseColor, colorC, fresnel);
      
      // Add subtle pulse
      float pulse = sin(time * 2.0) * 0.5 + 0.5;
      finalColor = mix(finalColor, colorC, pulse * 0.1);
      
      // Add glitch effect
      float glitchTime = floor(time * 10.0) / 10.0;
      float glitchNoise = fract(sin(glitchTime * 123.456) * 7890.123);
      
      if (glitchNoise > 0.95) {
        finalColor = mix(finalColor, vec3(1.0), 0.2);
      }
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `,
)

// Registrar os materiais de shader
extend({ NebulaShaderMaterial, DistortionShaderMaterial })

// Componente de estrelas
function Stars({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null)
  const { viewport, camera } = useThree()

  // Gerar posições aleatórias para as estrelas
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = (Math.random() - 0.5) * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 50

      scales[i] = Math.random()
    }

    return { positions, scales }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return

    // Rotação lenta das estrelas
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.05
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.positions} itemSize={3} />
        <bufferAttribute attach="attributes-scale" count={count} array={positions.scales} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        color="white"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Componente de nebulosa
function Nebula({ mouseX, mouseY }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!mesh.current || !mesh.current.material) return

    // Atualizar uniforms do shader
    mesh.current.material.uniforms.time.value = state.clock.getElapsedTime()
    mesh.current.material.uniforms.resolution.value.set(viewport.width, viewport.height)
    mesh.current.material.uniforms.mousePosition.value.set(mouseX.get(), mouseY.get())
  })

  return (
    <mesh ref={mesh} position={[0, 0, -10]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <nebulaShaderMaterial transparent blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

// Componente do modelo 3D com distorção
function DistortedModel({ mouseX, mouseY }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!mesh.current || !mesh.current.material) return

    // Atualizar uniforms do shader
    mesh.current.material.uniforms.time.value = state.clock.getElapsedTime()
    mesh.current.material.uniforms.mousePosition.value.set(mouseX.get(), mouseY.get())

    // Rotação lenta
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2
    mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[2, 2, 2]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
      <distortionShaderMaterial transparent blending={THREE.AdditiveBlending} depthWrite={true} />
    </mesh>
  )
}

// Componente principal
export default function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Valores de movimento do mouse
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Suavizar o movimento do mouse
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      // Normalizar posição do mouse (0 a 1)
      const x = e.clientX / window.innerWidth
      const y = 1 - e.clientY / window.innerHeight

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#000000"]} />

        {/* Estrelas */}
        <Stars count={3000} />

        {/* Nebulosa */}
        <Nebula mouseX={smoothMouseX} mouseY={smoothMouseY} />

        {/* Modelo 3D com distorção */}
        <DistortedModel mouseX={smoothMouseX} mouseY={smoothMouseY} />

        {/* Controles de câmera desativados para este exemplo */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  )
}

// Função para memoizar valores
function useMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ deps: React.DependencyList; obj: T; initialized: boolean }>({
    deps,
    obj: null as unknown as T,
    initialized: false,
  })

  if (ref.current.initialized === false || !depsAreSame(deps, ref.current.deps)) {
    ref.current.deps = deps
    ref.current.obj = factory()
    ref.current.initialized = true
  }

  return ref.current.obj
}

// Função auxiliar para comparar dependências
function depsAreSame(oldDeps: React.DependencyList, newDeps: React.DependencyList): boolean {
  if (oldDeps.length !== newDeps.length) return false

  for (let i = 0; i < newDeps.length; i++) {
    if (oldDeps[i] !== newDeps[i]) return false
  }

  return true
}
