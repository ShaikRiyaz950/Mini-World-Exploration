import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'

function Earth() {
  const globe = useRef()
  useFrame((_, delta) => { if (globe.current) globe.current.rotation.y += delta * 0.12 })
  const markers = [[0, 0.2, 1], [0.7, 0.4, 0.6], [-0.7, 0.3, 0.6], [0.2, -0.6, 0.8], [-0.5, -0.4, 0.7]]
  return (
    <group ref={globe}>
      <mesh><sphereGeometry args={[1.7, 64, 64]} /><meshStandardMaterial color="#087ca7" roughness={0.75} metalness={0.2} /></mesh>
      <mesh scale={1.015}><sphereGeometry args={[1.7, 32, 32]} /><meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.13} /></mesh>
      {markers.map((point, index) => <mesh key={index} position={point.map((value) => value * 1.71)}><sphereGeometry args={[0.045, 16, 16]} /><meshBasicMaterial color="#67e8f9" /></mesh>)}
    </group>
  )
}

export default function Globe3D() {
  return (
    <div className="h-[340px] w-full md:h-[430px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={1.5} /><directionalLight position={[5, 3, 5]} intensity={3} />
        <Stars radius={80} depth={50} count={2500} factor={4} fade /><Earth />
        <OrbitControls enableZoom minDistance={3.5} maxDistance={8} enablePan={false} />
      </Canvas>
    </div>
  )
}
