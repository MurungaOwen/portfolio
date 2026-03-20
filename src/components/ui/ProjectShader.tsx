import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const LiquidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Noise effect based on hover
      vec2 uv = vUv;
      float noise = snoise(uv * 10.0 + uTime * 0.5) * 0.04 * uHover;
      
      // Zoom effect based on hover
      vec2 centered = uv - 0.5;
      centered *= (1.0 - (0.05 * uHover));
      uv = centered + 0.5;
      
      uv += vec2(noise);
      
      vec4 texColor = texture2D(uTexture, uv);
      
      // Add slight lime tint on hover
      vec3 finalColor = mix(texColor.rgb, vec3(0.64, 0.9, 0.2), uHover * 0.15);
      
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `
);

extend({ LiquidDistortionMaterial });

function ShaderScene({ url, isHovered }: { url: string, isHovered: boolean }) {
  const texture = useTexture(url);
  const materialRef = useRef<any>(null);

  useFrame((_state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      
      // Smoothly interpolate uHover
      const targetHover = isHovered ? 1 : 0;
      materialRef.current.uHover += (targetHover - materialRef.current.uHover) * 0.1;
    }
  });

  return (
    <mesh>
      {/* Plane geometry matching aspect video (16:9 approx) */}
      <planeGeometry args={[16, 9]} />
      {/* @ts-ignore - Dynamic generic fiber component */}
      <liquidDistortionMaterial 
        ref={materialRef} 
        uTexture={texture} 
        transparent 
      />
    </mesh>
  );
}

export default function ProjectShader({ url }: { url: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-full cursor-pointer mix-blend-screen"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 8.5], fov: 60 }} dpr={[1, 2]}>
        <ShaderScene url={url} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
