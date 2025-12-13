import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function ArcReactor(props) {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate rings slightly
    if (outerRingRef.current) {
        outerRingRef.current.rotation.z = t * 0.1;
    }
    if (innerRingRef.current) {
        innerRingRef.current.rotation.z = -t * 0.3;
        innerRingRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }
    
    // Pulse core
    if (coreRef.current) {
        const intensity = 0.8 + Math.sin(t * 2) * 0.1;
        coreRef.current.scale.setScalar(intensity);
    }
  });

  return (
    <group {...props}>
      {/* Outer Metallic Casing Ring - Bright Silver/Chrome */}
      <Torus ref={outerRingRef} args={[2.2, 0.15, 16, 100]}>
        <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.6} 
            roughness={0.1} 
            envMapIntensity={2}
        />
      </Torus>

      {/* Inner Glowing Ring Segments */}
      <group ref={innerRingRef}>
        <Torus args={[1.6, 0.1, 16, 100]}>
           <meshStandardMaterial 
              color="#FFD700" /* Gold Ring Base */
              metalness={0.8}
              roughness={0.2}
           />
        </Torus>
        {/* Glowing segments - Vivid Cyan */}
        {Array.from({ length: 12 }).map((_, i) => (
           <mesh 
             key={i} 
             position={[Math.cos(i/12 * Math.PI * 2) * 1.6, Math.sin(i/12 * Math.PI * 2) * 1.6, 0]}
             rotation={[0, 0, i/12 * Math.PI * 2]}
            >
               <boxGeometry args={[0.15, 0.4, 0.1]} />
               <meshStandardMaterial 
                  color="#00BCD4" 
                  emissive="#00BCD4" 
                  emissiveIntensity={4}
                  toneMapped={false}
               />
           </mesh>
        ))}
      </group>

      {/* Central Core */}
      <group ref={coreRef}>
        {/* Core Frame - Gold */}
         <Torus args={[0.6, 0.05, 16, 50]}>
            <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
         </Torus>
         
         {/* The Light */}
        <Cylinder args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
                color="#E0F7FA" 
                emissive="#00E5FF" 
                emissiveIntensity={5} 
                toneMapped={false}
            />
        </Cylinder>
      </group>
      
      {/* Ambient Glow */}
      <pointLight distance={15} intensity={80} color="#00E5FF" decay={1.5} />
    </group>
  );
}
