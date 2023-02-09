import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { useRef } from 'react';

const OuterCube = () => {
   const ref = useRef();
   useFrame((state) => {
      ref.current!.rotation.y = state.clock.getElapsedTime() / 4;
   });

   return (
      <mesh ref={ref}>
         <boxGeometry />
         <meshBasicMaterial color={[6, 0.5, 2]} />
      </mesh>
   );
};

export const Cube = () => {
   return (
      <>
         <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
            <OuterCube />
            <EffectComposer multisampling={12}>
               <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={2} intensity={1.6} />
               <Bloom luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
            </EffectComposer>
         </Canvas>
      </>
   )
}