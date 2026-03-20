import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CURSOR_TRAIL_LENGTH = 40;

function TrailParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Store trail history
  const positions = useRef<{ x: number, y: number }[]>([]);
  // Store global mouse explicitly to allow canvas pointer events to be fully disabled
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to React Three Fiber WebGL coordinates (-1 to 1)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const { x, y } = mouse.current;
    
    // Map normalized screen coordinates to view coordinates 
    const viewport = state.viewport;
    const targetX = (x * viewport.width) / 2;
    const targetY = (y * viewport.height) / 2;

    // Add current position to start of array
    positions.current.unshift({ x: targetX, y: targetY });
    
    // Keep array at fixed length
    if (positions.current.length > CURSOR_TRAIL_LENGTH) {
      positions.current.pop();
    }

    // Update instanced mesh positions and scales
    for (let i = 0; i < CURSOR_TRAIL_LENGTH; i++) {
      const pos = positions.current[i] || positions.current[positions.current.length - 1] || { x: targetX, y: targetY };
      
      // Calculate scale - particles get smaller as they get older
      const scale = Math.max(0, 1 - (i / CURSOR_TRAIL_LENGTH));
      
      dummy.position.set(pos.x, pos.y, 0);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CURSOR_TRAIL_LENGTH]}>
      <circleGeometry args={[0.08, 16]} />
      <meshBasicMaterial color="#a3e635" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function GlobalCursor() {
  // Only render on desktop to save battery on low-end mobile devices and prevent touch bugs
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen opacity-80" aria-hidden="true">
      {/* Ensure the canvas element itself intercepts no pointer events, allowing buttons to be clicked */}
      <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <TrailParticles />
      </Canvas>
    </div>
  );
}
