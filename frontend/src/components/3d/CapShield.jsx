import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Ring, Circle } from '@react-three/drei';
import * as THREE from 'three';

export const CapShield = forwardRef((props, ref) => {
  const localRef = useRef();

  useImperativeHandle(ref, () => localRef.current);
  
  useFrame((state) => {
    // Only auto-rotate if transparency/float isn't being controlled by an external animation
    // But since we want to animate it, we might want to keep some idle rotation?
    // Let's keep the self-rotation for the "shine" effect but allow position/scale to be overridden
    const t = state.clock.getElapsedTime();
    if (localRef.current) {
        // We add to the rotation, so GSAP can set base rotation or position
        localRef.current.rotation.z += 0.005; 
        
        // Slight wobble only if not being heavily animated
        // localRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  const RedMaterial = <meshPhysicalMaterial 
    color="#AA0505" 
    metalness={0.6}
    roughness={0.2}
    clearcoat={1}
    clearcoatRoughness={0.1}
    reflectivity={1}
  />;

  const WhiteMaterial = <meshPhysicalMaterial 
    color="#E0E0E0" 
    metalness={0.8}
    roughness={0.2}
    clearcoat={1}
  />;
  
  const BlueMaterial = <meshPhysicalMaterial 
    color="#000088" 
    metalness={0.6}
    roughness={0.2}
    clearcoat={1}
  />;

  return (
    <group ref={localRef} {...props}>
      {/* 1. Outer Red Ring */}
      <mesh>
        <ringGeometry args={[4, 5, 64]} />
        {RedMaterial}
      </mesh>

      {/* 2. White Ring */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[3, 4, 64]} />
        {WhiteMaterial}
      </mesh>

      {/* 3. Inner Red Ring */}
      <mesh position={[0, 0, 0.1]}>
         <ringGeometry args={[2, 3, 64]} />
         {RedMaterial}
      </mesh>

      {/* 4. Blue Core Circle */}
      <mesh position={[0, 0, 0.15]}>
         <circleGeometry args={[2, 64]} />
         {BlueMaterial}
      </mesh>

      {/* 5. White Star */}
      <mesh position={[0, 0, 0.2]}>
          <shapeGeometry args={[(() => {
              const starShape = new THREE.Shape();
              const outerRadius = 1.8;
              const innerRadius = 0.7;
              const spikes = 5;
              
              const step = Math.PI / spikes;
              
              // Draw star
              for(let i = 0; i < 2 * spikes; i++){
                  const r = (i % 2 === 0) ? outerRadius : innerRadius;
                  const a = i * step + Math.PI / 2; // Start from top
                  const x = r * Math.cos(a);
                  const y = r * Math.sin(a);
                  if(i === 0) starShape.moveTo(x, y);
                  else starShape.lineTo(x, y);
              }
              starShape.closePath();
              return starShape;
          })()]} />
          {WhiteMaterial}
      </mesh>
    </group>
  );
});
