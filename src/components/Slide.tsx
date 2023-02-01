import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export const Slide = () => {
   const containerRef = useRef(null);

   //TODO: fix ts error - fix multiple renders caused by useEffect
   useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
         75,
         window.innerWidth / window.innerHeight,
         0.1,
         1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current!.appendChild(renderer.domElement);

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(
         new THREE.Vector2(window.innerWidth, window.innerHeight),
         1.8,
         0.1,
         0.1
      );
      composer.addPass(bloomPass);
      bloomPass.strength = 0.5;
      bloomPass.radius = 5;
      bloomPass.threshold = 0.1;

      renderer.toneMapping = THREE.LinearToneMapping;
      renderer.toneMappingExposure = 3;


      // create triangle sha 
      const triangleShape = new THREE.Shape();
      triangleShape.moveTo(0, 1);
      triangleShape.lineTo(-1, -1);
      triangleShape.lineTo(1, -1);
      triangleShape.lineTo(0, 1);

      // create hole in the triangle shape
      const hole = new THREE.Path();
      hole.moveTo(0, 1);
      hole.lineTo(-1, -1);
      hole.lineTo(1, -1);
      hole.lineTo(0, 1);
      triangleShape.holes.push(hole);


      const ambientLight = new THREE.AmbientLight(0x1b08b2);
      scene.add(ambientLight);

      // LIGHT 
      {/**
      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.castShadow = true;
      scene.add(spotLight);

      scene.add(spotLight);
      spotLight.shadow.mapSize.width = 512; // default
      spotLight.shadow.mapSize.height = 512; // default
      spotLight.shadow.camera.near = 0.5; // default
      spotLight.shadow.camera.far = 500; // default
      spotLight.shadow.focus = 1; // default
      **/}

      // extrude triangle shape to 3d object
      const extrudeSettings = { depth: 1, bevelEnabled: true };
      const geometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
      const material = new THREE.MeshLambertMaterial({ color: 0x297981 });
      const triangle = new THREE.Mesh(geometry, material);
      triangle.castShadow = true;
      triangle.receiveShadow = false;
      scene.add(triangle);


      // create water plane
      const waterGeometry = new THREE.PlaneGeometry(100, 100);
      const waterMaterial = new THREE.MeshBasicMaterial({
         color: 0x0077be,
         transparent: true,
         opacity: 0.1,
         side: THREE.DoubleSide
      });
      const waterPlane = new THREE.Mesh(waterGeometry, waterMaterial);
      waterPlane.rotateX(-Math.PI / 2);
      waterPlane.position.y = -1;
      waterPlane.receiveShadow = true;
      scene.add(waterPlane);

      camera.position.z = 5;


      const animate = () => {
         requestAnimationFrame(animate);
         composer.render();
      };
      animate();
   }, []);

   return (
      <>
         <div ref={containerRef}>

         </div>
      </>
   )
};
