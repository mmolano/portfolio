import { noiseShader } from "@/lib/glsl/noise";
import { Reflector, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef, Suspense } from "react";
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
   const layerMaterial = createLayerShaderMaterial(noiseShader, layerShaderUniforms);
   const layerCount = 8;

   for (let i = 0; i < layerCount; i++) {
      const layer = createLayer(i / layerCount, layerMaterial);
      box.add(layer);
   }

   return box;
}

function Box() {
   const [box, setBox] = useState<THREE.Object3D>();

   useEffect(() => {
      if (process.env.NEXT_PUBLIC_NODE === 'production') {
         // disable warn on mouse movement caused by texture
         console.warn = () => { };
      }
      
      const boxObject = createBoxObject(layerShaderUniforms);
      setBox(boxObject);

      return () => {
         boxObject.traverse((object) => {
            if (object instanceof THREE.Mesh) {
               object.geometry.dispose();
               object.material.dispose();
            }
         });
      };
   }, [layerShaderUniforms]);

   const boxRef = useRef<THREE.Mesh>(null);

   useFrame((state, delta) => {
      layerShaderUniforms.time.value += delta;
   });

   return (
      <mesh position={[0, 0, 0]} rotation={[0.7, 0.7, 0.1]} castShadow ref={boxRef}>
         {box && <primitive object={box} />}
      </mesh>
   );
}


function Ground(props: any) {
   const [floorTexture, normalTexture] = useTexture(['/images/reflections/surface_blur.jpeg', '/images/reflections/surface.jpeg'])

   const color = new THREE.Color(0xb1 / 0xff, 0x91 / 0xff, 0xff / 0xff);

   return (
      <Reflector resolution={300} args={[300, 400]} {...props}>
         {(Material: any, props: any) => (
            <Material
               color={color}
               metalness={0}
               roughnessMap={floorTexture}
               roughnessMapEncoding={THREE.sRGBEncoding}
               roughnessMapType={THREE.UnsignedByteType}
               normalMap={normalTexture}
               normalScale={[1, 2]}
               {...props}
            />
         )}
      </Reflector>
   );
}

function Rig({ children }: { children: React.ReactNode }) {
   const ref = useRef<THREE.Group>(null);
   const vec = new THREE.Vector3();
   const { mouse } = useThree();

   useFrame(() => {
      if (ref.current) {
         ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
         ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1);
      }
   });

   return <group ref={ref}>{children}</group>;
}

const WaveCube = () => {
   return (
      <Canvas
         camera={{ position: [0, 2, 10], fov: 70 }}
      >
         <color attach="background" args={['black']} />
         <ambientLight intensity={1} />
         <pointLight position={[0, 0, 0]} />
         <Suspense fallback={null}>
            <Rig>
               <Ground
                  mirror={1}
                  blur={[350, 100]}
                  mixBlur={8}
                  mixStrength={0.7}
                  rotation={[-Math.PI / 2, -0.1, Math.PI / 2]}
                  position={[0, -1.6, 0]}
               />
               <Box />
            </Rig>
         </Suspense>
      </Canvas>
   );
}

export default WaveCube;