import React, { useState, useEffect }  from 'react';
import { MapContainer, TileLayer, Popup, Rectangle, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import './james.css';
import L from 'leaflet';
import * as THREE from 'three';


function ReturnHome({ center, zoom,  setReturnHome }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    setReturnHome(false);
  }, [center, zoom, map, setReturnHome]);
  return null;
}

export default function James() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [returnHome, setReturnHome] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const center = [38.87280, -94.78253];
  const homeZoom = 17;
  const bounds = [
      [38.87635, -94.78213], 
      [38.87715, -94.78283]  
  ];

  const customIcon = L.icon({
    iconUrl: '/user_location.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleLocationClick = () => {
    setShowSidebar(true); 
  };

  const handHomeButtonClick = () => {
    setReturnHome(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = [position.coords.latitude, position.coords.longitude];
            setUserLocation(loc);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }, 1000); // Adjusted interval to 1 second (1000 ms) for performance
  
    return () => clearInterval(intervalId);
  }, []);

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
  
 
  return (
    <div className='home_page'>
      <div className='map_container'>
        <div className='home_button' onClick={handHomeButtonClick}>
          <img className='home_img' src="/ccsc_home_button_v3.png" alt="Home Button" />
        </div>
        <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Rectangle
            bounds={bounds}
            pathOptions={{ color: '', fillOpacity: 0.0, fillColor: 'blue' }}
            eventHandlers={{ click: handleLocationClick }}
          >
            <Popup>
              <strong>Bell Center</strong>
            </Popup>
          </Rectangle>
          {returnHome && <ReturnHome center={center} zoom={homeZoom} setReturnHome={setReturnHome} />}
          {userLocation && (
            <Marker position={userLocation} icon={customIcon}>
              <Popup>You're Here</Popup>
            </Marker>
          )}
          {/* Add the 3D overlay component */}
          <ThreeDOverlay />
        </MapContainer>
      </div>

      {showSidebar && (
        <div className="side_bar">
          <h3>Bell Cultural Events Center</h3>
          <p>Details about the event...</p>
          <button onClick={() => setShowSidebar(false)}>Close</button>
        </div>
      )}
    </div>    
  );
}