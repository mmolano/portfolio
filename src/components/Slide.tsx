import { Float, Line, OrbitControls, Sky, Sphere, Stars, Trail } from '@react-three/drei';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { Suspense, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import Typewriter from 'typewriter-effect';

function Box() {
   const ref = useRef()
   useFrame((state) => {
      ref.current.rotation.y += 0.01
   })
   return (
      <mesh ref={ref} scale={5}>
         <boxBufferGeometry />
         <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </mesh>
   )
}

export const Slide = () => {
   const [glitch, setGlitch] = useState<boolean>(false);

   return (
      <>
         <section className="first-element">
            <div>
               <h2 data-text="Hi! Welcome to my portfolio" className={glitch ? "glitch" : ''}>
                  <Typewriter
                     options={{
                        delay: 50,
                     }}
                     onInit={(typewriter) => {
                        typewriter.typeString('Hi! Welcome to my portfolio')
                           .callFunction(() => {
                              setGlitch(true);
                           })
                           .start();
                     }}
                  />
               </h2>
               <ul data-text={`
                  <li>&quot;title&quot; : &quot;Hi! Welcome&quot;</li>
                  <li>&quot;firstName&quot; : &quot;Miguel&quot;</li>
                  <li>&quot;name&quot; : &quot;Molano&quot;</li>
                  <li>&quot;type&quot; : &quot;Web Developer&quot;</li>
                  Error could not load HTML 
                  `} className={glitch ? "animate-in glitch" : 'animate-out'}>
                  {'{'}
                  <li>&quot;title&quot; : &quot;Hi! Welcome&quot;</li>
                  <li>&quot;firstName&quot; : &quot;Miguel&quot;</li>
                  <li>&quot;name&quot; : &quot;Molano&quot;</li>
                  <li>&quot;type&quot; : &quot;Web Developer&quot;</li>
                  {'}'}
               </ul>
            </div>
            <div className="three-box-container">
               <Canvas camera={{ position: [0, 10, 50], fov: 17 }}>
                  <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                     <Box />
                  </Float>
                  <EffectComposer>
                     <Bloom mipmapBlur luminanceThreshold={1} radius={0.4} />
                  </EffectComposer>
               </Canvas>
            </div>

            <div className="widget-scroll">
               <div className="widget-scroll-inside"></div>
            </div>
         </section>
      </>
   )
}
