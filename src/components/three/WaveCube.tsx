import { noiseShader } from "@/lib/glsl/noise";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useState } from "react";
import * as THREE from "three";

interface LayerShaderUniforms {
   time: { value: number };
   scale: { value: THREE.Vector3 };
}

const layerShaderUniforms: LayerShaderUniforms = {
   time: { value: 0.0 },
   scale: { value: new THREE.Vector3(3.0, 3.0, 2.5) },
};

function createLayerShaderMaterial(noiseShader: string, uniforms: any) {
   return new THREE.ShaderMaterial({
      transparent: true,

      uniforms: uniforms,
      vertexShader: `
      uniform vec3 scale;
      varying vec3 vPosition;

      void main() {
          vPosition = position;
          gl_Position = projectionMatrix *
              modelViewMatrix *
              vec4(position * scale, 1.0);
      }`,

      fragmentShader: `${noiseShader}
      uniform float time;
      varying vec3 vPosition;

      void main() {
          vec3 base = vec3(.55, .3, 1.0);
          vec3 top = vec3(.53, .89, .84);

          float timeMultiplier1 = .25;
          vec3 offset1 = vec3(
              time * timeMultiplier1,
              time * timeMultiplier1,
              time * timeMultiplier1
          );
          float timeMultiplier2 = .333;
          vec3 offset2 = vec3(
              time * -timeMultiplier2,
              time * -timeMultiplier2,
              time * -timeMultiplier2
          );

          float noiseScale = 1.5;
          float random1 = snoise(vPosition * noiseScale + offset1);
          float random2 = snoise(vPosition * noiseScale + offset2);
          float random = ((random1 + random2) / 2.0) + 1.0 / 2.0;

          float intensityOffset = .3;
          float intensity = max(.0, floor(random + intensityOffset));

          vec3 color = base + (top - base) * vPosition.z + intensity * .1;

          float alphaBase = .1;
          float alphaMultiplier = 1.0 - alphaBase;
          float alpha = intensity * alphaMultiplier + alphaBase;

          gl_FragColor = vec4(color, alpha);
      }`,
   });
}

function createLayer(y: number, material: THREE.Material) {
   const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
   const positions = geometry.attributes.position.array as Float32Array;

   for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = y;
   }

   const mesh = new THREE.Mesh(geometry, material);
   mesh.rotation.x = -Math.PI / 2;
   return mesh;
}

function createBoxObject(layerShaderUniforms: LayerShaderUniforms) {
   const box = new THREE.Object3D();

   const layerMaterial = createLayerShaderMaterial(
      noiseShader,
      layerShaderUniforms
   );
   const layerCount = 20;

   for (let i = 0; i < layerCount; i++) {
      box.add(createLayer(i / layerCount, layerMaterial));
   }

   return box;
}

function Box() {
   const [box, setBox] = useState<THREE.Object3D | null>(null);
   const update = (time: number) => {
      layerShaderUniforms.time.value = time / 1000;
      requestAnimationFrame(update);
   }

   requestAnimationFrame(update);

   useFrame(() => {
      const box = createBoxObject(layerShaderUniforms);
      setBox(box);
   });

   return (
      <mesh position={[0, 0, 4]} rotation={[0.7, 0.7, 0.1]} castShadow>
         {box && <primitive object={box} />}
      </mesh>
   );
}

export const WaveCube = () => {
   return (
      <Canvas
         camera={{ position: [0, 0, 10] }}
      >
         <Box />
      </Canvas>
   );
}