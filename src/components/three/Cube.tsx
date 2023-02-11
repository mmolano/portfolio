import { Box, Edges } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { useRef } from 'react';
import { Mesh } from 'three';

const OuterCube = () => {
   const cubeRef = useRef<Mesh>();
   useFrame((state) => {
      cubeRef.current!.rotation.y = state.clock.getElapsedTime() / 2;
   });

   return (
      <>
         <mesh ref={cubeRef} scale={[1, 1, 1]} position={[1, -2, 2]} >
            <boxGeometry />
            <meshBasicMaterial color={[6, 0.5, 2]} />
            <Edges
               scale={7}
               threshold={15}
               color="#6113ad"
            />
            <Box scale={[5, 5, 5]} material-color="#6502a0"/>
         </mesh>
      </>
   );
};

export const Cube = () => {
   return (
      <>
         <Canvas dpr={[1, .7]} camera={{ position: [1, 1, 25] }}>
            <OuterCube />
            <EffectComposer multisampling={7}>
               <Bloom kernelSize={4} luminanceThreshold={0} luminanceSmoothing={0} intensity={99} />
            </EffectComposer>
         </Canvas>
      </>
   )
}