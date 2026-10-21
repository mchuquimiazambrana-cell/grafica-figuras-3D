import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import type { Mesh } from 'three'

// ESFERA ---
function Esfera() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false) 
  
  // Estados para la posición
  const [pos, setPos] = useState<[number, number, number]>([-2.5, 0, 0])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5
  })

  // Función para mover al hacer clic
  const alHacerClic = (e: any) => {
    e.stopPropagation() // Evita que el clic afecte a otras figuras
    setPos([pos[0] + 0.5, pos[1] + 0.5, pos[2]]) // Se mueve en diagonal
  }

  return (
    <mesh 
      ref={ref} 
      position={pos} // Usamos el estado
      scale={encima ? 1.3 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={alHacerClic} // NUEVO: Evento de clic
    >
      <sphereGeometry args={[0.65, 32, 32]} />
      <meshStandardMaterial 
        color={encima ? "hotpink" : "deepskyblue"} 
        roughness={0.3} 
      />
    </mesh>
  )
}

// triangulo
function Triangulo() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)
  
  // NUEVO: Estados para la posición
  const [pos, setPos] = useState<[number, number, number]>([0, 0, 0])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8
  })

  // NUEVO: Función para mover al hacer clic
  const alHacerClic = (e: any) => {
    e.stopPropagation()
    setPos([pos[0], pos[1] - 0.5, pos[2]]) // Se mueve hacia abajo
  }

  return (
    <mesh 
      ref={ref} 
      position={pos} // Usamos el estado
      scale={encima ? 1.3 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={alHacerClic} // NUEVO: Evento de clic
    >
      <cylinderGeometry args={[0.7, 0.7, 1.3, 3]} />
      <meshStandardMaterial 
        color={encima ? "gold" : "orange"} 
        metalness={0.35} 
        roughness={0.3} 
        flatShading 
      />
    </mesh>
  )
}

// cono
function Cono() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)

  //Estados para la posición
  const [pos, setPos] = useState<[number, number, number]>([2.5, 0, 0])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4
  })

  // NUEVO: Función para mover al hacer clic
  const alHacerClic = (e: any) => {
    e.stopPropagation()
    setPos([pos[0] - 0.5, pos[1] + 0.5, pos[2]]) // Se mueve en diagonal opuesta
  }

  return (
    <mesh 
      ref={ref} 
      position={pos} // Usamos el estado
      scale={encima ? 1.6 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={alHacerClic} // NUEVO: Evento de clic
    >
      <coneGeometry args={[0.60, 1.3, 36]} />
      <meshStandardMaterial 
        color={encima ? "lightgreen" : "mediumseagreen"} 
        roughness={0.35} 
      />
    </mesh>
  )
}

// funciones
export default function App() {
  return (
    <main className="escena">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={2} />

        <Environment files="/mel.jpg" background />

        {/* funcionamiento de las figuras*/}
        <Esfera />
        <Triangulo />
        <Cono />

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>

      <p className="ayuda">Arrastra para mirar alrededor · Usa la rueda para acercar · Haz clic en las figuras para moverlas</p>
    </main>
  )
}