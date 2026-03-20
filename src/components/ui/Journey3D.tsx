import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Tube, MapControls } from '@react-three/drei';
import * as THREE from 'three';
import { timeline } from '@/data/about';

const NODE_DISTANCE = 4.5;

function Path() {
  // Generate a curvy CatmullRomCurve3 for the winding "Duolingo-style" road
  const curve = useMemo(() => {
    const points = timeline.map((_, i) => {
      const isLeft = i % 2 === 0;
      // Winding snake pattern with a bit of randomness
      const x = isLeft ? -2.5 : 2.5; 
      const randomX = x + (Math.sin(i * 45) * 0.8);
      const z = -i * NODE_DISTANCE;
      return new THREE.Vector3(randomX, 0, z);
    });
    
    // Add extra points at the start and end to extend the road
    if (points.length > 0) {
      points.unshift(new THREE.Vector3(0, 0, NODE_DISTANCE));
      points.push(new THREE.Vector3(0, 0, -timeline.length * NODE_DISTANCE));
    }
    
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, []);

  return (
    <Tube args={[curve, 150, 0.35, 8, false]}>
      <meshStandardMaterial color="#18181b" roughness={0.9} />
    </Tube>
  );
}

function MapNode({ item, index, activeIndex, setActiveIndex }: { item: any, index: number, activeIndex: number, setActiveIndex: (i: number) => void }) {
  const isCompleted = index <= activeIndex;
  const isCurrent = index === activeIndex;
  const Icon = item.icon;

  const position = useMemo(() => {
    const isLeft = index % 2 === 0;
    const x = isLeft ? -2.5 : 2.5;
    const randomX = x + (Math.sin(index * 45) * 0.8);
    const z = -index * NODE_DISTANCE;
    return new THREE.Vector3(randomX, 0, z);
  }, [index]);

  const [hovered, setHovered] = useState(false);

  // Bouncing animation for current node
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (isCurrent && groupRef.current) {
      // Game-like bouncy hover animation for the active player/level node
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.25 + 0.1;
    } else if (groupRef.current) {
      // Return to ground gracefully when no longer active
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Platform Geometry (Like a small game board tile) */}
      <mesh 
        onClick={(e) => { e.stopPropagation(); setActiveIndex(index); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow 
        receiveShadow
        position={[0, 0.2, 0]}
      >
        <cylinderGeometry args={[0.9, 1.1, 0.4, 32]} />
        <meshStandardMaterial 
          color={isCurrent ? '#a3e635' : isCompleted ? '#3f6212' : '#27272a'} 
          roughness={0.6}
          metalness={0.1}
          emissive={isCurrent ? '#a3e635' : isCompleted ? '#3f6212' : '#000000'}
          emissiveIntensity={hovered || isCurrent ? 0.3 : 0}
        />
      </mesh>

      {/* Floating 2D Icon mapped perfectly inside the 3D space */}
      <Html position={[0, 0.8, 0]} center zIndexRange={[50, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-[3px] shadow-2xl transition-all duration-300 ${isCurrent ? 'bg-zinc-950 border-lime-400 text-lime-400 scale-125' : isCompleted ? 'bg-zinc-900 border-[#4d7c0f] text-[#a3e635]' : 'bg-[#050706] border-zinc-800 text-zinc-600'}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </Html>
    </group>
  );
}

function MapScene({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (i: number) => void }) {
  const controlsRef = useRef<any>(null);

  // Cinematic frame loop to slowly auto-pan the map to follow the user's progress
  useFrame(() => {
    if (controlsRef.current) {
      const targetZ = -activeIndex * NODE_DISTANCE;
      
      const targetLookAt = new THREE.Vector3(0, 0, targetZ); 

      // Smoothly pan map target
      controlsRef.current.target.lerp(targetLookAt, 0.04);
      
      // Smoothly drag the camera alongside the target
      const currentCamPos = controlsRef.current.object.position;
      const idealCamPos = new THREE.Vector3(0, 10, targetZ + 12);
      currentCamPos.lerp(idealCamPos, 0.04);
      
      controlsRef.current.update();
    }
  });

  return (
    <>
      <MapControls 
        ref={controlsRef} 
        enableRotate={false} /* Disabled rotation keeps it strictly acting like an interactive 2D web map */
        enableZoom={true}
        minDistance={5}
        maxDistance={25}
        dampingFactor={0.05}
      />
      
      <Path />
      
      {timeline.map((item, index) => (
        <MapNode 
          key={index} 
          item={item} 
          index={index} 
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </>
  );
}

export default function Journey3D() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex(i => Math.min(timeline.length - 1, i + 1));
  };

  const handlePrev = () => {
    setActiveIndex(i => Math.max(0, i - 1));
  };

  return (
    <div className="w-full h-[75vh] md:h-[85vh] border border-zinc-900 bg-gradient-to-t from-[#0e1210] to-[#040504] rounded-3xl relative overflow-hidden shadow-2xl shadow-lime-400/5">
      
      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <p className="inline-block px-3 py-1 bg-lime-400/10 border border-lime-400/20 text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-2 backdrop-blur-md shadow-lg">
          Career Map
        </p>
        <p className="text-zinc-500 text-sm hidden sm:block">Drag map to explore</p>
      </div>

      {/* 100% Mobile Responsive Story Card Overlay */}
      <div className="absolute top-20 left-4 right-4 md:left-auto md:right-8 md:top-8 z-20 md:w-80 pointer-events-none">
        <div key={activeIndex} className="p-5 md:p-6 rounded-2xl border border-lime-400/30 bg-[#090b09]/95 shadow-[0_0_40px_rgba(163,230,53,0.15)] backdrop-blur-md transform transition-all duration-300">
          <p className="text-lime-400 font-mono text-xs w-[fit-content] tracking-widest mb-3 uppercase bg-lime-400/10 px-2 py-1 rounded-sm border border-lime-400/20">
            {timeline[activeIndex].year}
          </p>
          <h3 className="text-zinc-100 font-bold text-lg md:text-xl mb-2 leading-tight">{timeline[activeIndex].title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{timeline[activeIndex].description}</p>
        </div>
      </div>

      {/* Centralized Game-style Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Progress Dots */}
        <div className="flex gap-2 mb-4">
          {timeline.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-lime-400' : i < activeIndex ? 'w-2 bg-[#4d7c0f]' : 'w-2 bg-zinc-800'}`}
            />
          ))}
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="px-6 py-3 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:border-lime-400 text-zinc-300 font-bold tracking-wide uppercase text-sm rounded-full disabled:opacity-30 disabled:hover:border-zinc-700 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            Prev
          </button>

          <button 
            onClick={handleNext}
            disabled={activeIndex === timeline.length - 1}
            className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-bold tracking-wide uppercase text-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            Next
          </button>
        </div>
      </div>

      <Canvas camera={{ position: [0, 12, 10], fov: 40 }} dpr={[1, 2]} shadows>
        <fog attach="fog" args={['#040504', 10, 35]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 15, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />
        <MapScene activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </Canvas>
    </div>
  );
}
