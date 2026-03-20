import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const r = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta / 10;
      ref.current.rotation.x += delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a3e635"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function TechCore() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      // Interpolate towards mouse position
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    }
    
    if (meshRef1.current) {
      meshRef1.current.rotation.x += delta * 0.2;
      meshRef1.current.rotation.y += delta * 0.3;
    }
    
    if (meshRef2.current) {
      meshRef2.current.rotation.x -= delta * 0.15;
      meshRef2.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef1}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color="#a3e635" wireframe={true} transparent opacity={0.15} />
        </mesh>
        <mesh ref={meshRef2} scale={0.7}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#a3e635" wireframe={true} transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto mix-blend-screen" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
        <fog attach="fog" args={['#090b09', 2, 7]} />
        <ParticleSwarm />
        <TechCore />
      </Canvas>
    </div>
  );
}
