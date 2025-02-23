import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import * as THREE from 'three';

const ThreeDOverlay = () => {
  const map = useMap();

  useEffect(() => {
    // Create and configure the three.js renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(map.getSize().x, map.getSize().y);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;

    // Append renderer's canvas to the map's overlay pane
    const overlayPane = map.getPanes().overlayPane;
    overlayPane.appendChild(renderer.domElement);

    // Set up the three.js scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      map.getSize().x / map.getSize().y,
      0.1,
      1000
    );
    // Position the camera so that the scene is visible
    camera.position.set(0, 0, 100);

    // Add a sample 3D object (a spinning cube)
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop: render the three.js scene
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Update renderer size on map resize
    const onResize = () => {
      const size = map.getSize();
      renderer.setSize(size.x, size.y);
      camera.aspect = size.x / size.y;
      camera.updateProjectionMatrix();
    };
    map.on('resize', onResize);

    // Cleanup on component unmount
    return () => {
      map.off('resize', onResize);
      overlayPane.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [map]);

  return null;
};

export default ThreeDOverlay;