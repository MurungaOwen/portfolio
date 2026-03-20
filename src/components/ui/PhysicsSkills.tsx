import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier';
import { Text, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'Python', 'TypeScript', 'React', 'Node.js', 'Next.js', 
  'Golang', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 
  'GraphQL', 'FastAPI', 'Redis', 'TailwindCSS'
];

interface SkillBlockProps {
  position: [number, number, number];
  text: string;
  sizeMultiplier: number;
}

function SkillBlock({ position, text, sizeMultiplier }: SkillBlockProps) {
  const [hovered, setHovered] = useState(false);
  const width = Math.max(2.8, text.length * 0.35) * sizeMultiplier;
  const height = 0.85 * sizeMultiplier;
  const depth = 0.85 * sizeMultiplier;

  return (
    <RigidBody position={position} colliders="cuboid" restitution={0.8} friction={0.1}>
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, depth]} />
        
        {/* Stunning Premium Glassmorphism Material */}
        <meshPhysicalMaterial 
          color={hovered ? '#d9f99d' : '#18181b'} // Lime 200 on hover, Zinc 900 otherwise
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={hovered ? 0.05 : 0.3}
          ior={1.5}
          thickness={0.5}
          specularIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        
        {/* Inner wireframe for a futuristic 'tech blueprint' aesthetic */}
        <mesh>
          <boxGeometry args={[width * 0.98, height * 0.98, depth * 0.98]} />
          <meshBasicMaterial 
            color={hovered ? '#a3e635' : '#3f3f46'} 
            wireframe={true} 
            transparent 
            opacity={0.3} 
          />
        </mesh>

        <Text
          position={[0, 0, depth / 2 + 0.01]}
          fontSize={0.3 * sizeMultiplier}
          color={hovered ? '#050706' : '#a3e635'} // Dark text on hover for contrast
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
          outlineWidth={hovered ? 0 : 0.015}
          outlineColor="#050706"
        >
          {text}
        </Text>
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  const { viewport } = useThree();
  
  useFrame(({ pointer }) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        )
      );
    }
  });

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <CuboidCollider args={[0.6, 0.6, 0.6]} />
    </RigidBody>
  );
}

// 100% Mobile Responsive Invisible Walls bound dynamically using the camera Viewport math
function ViewportWalls() {
  const { viewport } = useThree();
  const thickness = 2; // thick walls to prevent clipping
  const w = viewport.width;
  const h = viewport.height;

  return (
    <>
      <RigidBody type="fixed" position={[0, -h / 2 - thickness / 2, 0]}>
        <CuboidCollider args={[w, thickness / 2, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-w / 2 - thickness / 2, 0, 0]}>
        <CuboidCollider args={[thickness / 2, h * 2, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[w / 2 + thickness / 2, 0, 0]}>
        <CuboidCollider args={[thickness / 2, h * 2, 5]} />
      </RigidBody>
      {/* Front and back glass walls to trap pieces squarely on the Z axis constraint */}
      <RigidBody type="fixed" position={[0, 0, -2]}>
        <CuboidCollider args={[w, h * 2, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 2]}>
        <CuboidCollider args={[w, h * 2, 0.5]} />
      </RigidBody>
    </>
  );
}

export default function PhysicsSkills() {
  const [sizeMultiplier, setSizeMultiplier] = useState(1);

  // Automatically scales physics bodies for Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSizeMultiplier(0.65); // Scale down blocks for narrow widths
      } else {
        setSizeMultiplier(1);
      }
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[65vh] md:h-[75vh] border border-zinc-900 bg-gradient-to-br from-[#050706] to-[#090b09] rounded-2xl relative overflow-hidden shadow-2xl touch-none">
      
      {/* Sleek informative overlay */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
        <div>
          <p className="inline-block px-3 py-1 bg-lime-400/10 border border-lime-400/20 text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm mb-2 backdrop-blur-md">
            Interactive Stack
          </p>
          <p className="text-zinc-400 text-xs md:text-sm max-w-[200px] leading-relaxed hidden sm:block">
            Throw the blocks around. WebGL Physics simulation.
          </p>
        </div>
      </div>

      {/* Physics Container Canvas */}
      <Canvas camera={{ position: [0, 0, 14], fov: 45 }} dpr={[1, 2]} shadows>
        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="#a3e635" />
        
        {/* Custom Lightformers bounce brilliant reflections into the IOR Glassmorphism */}
        <Environment preset="city" resolution={256} background={false}>
          <Lightformer form="rect" intensity={5} position={[0, 5, 2]} scale={[10, 2, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" color="#a3e635" intensity={2} position={[-5, 2, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
        </Environment>

        {/* Lowered gravity gives a luxurious, floaty aesthetic */}
        <Physics gravity={[0, -4, 0]}>
          <Pointer />
          <ViewportWalls />
          
          {/* Skill Box Generation */}
          {skills.map((skill) => (
             <SkillBlock 
               key={skill} 
               text={skill} 
               position={[(Math.random() - 0.5) * 6, Math.random() * 10 + 5, 0]} 
               sizeMultiplier={sizeMultiplier}
             />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
}
