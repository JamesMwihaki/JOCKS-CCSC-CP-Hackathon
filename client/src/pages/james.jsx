import React, { useState, useEffect }  from 'react';
import { MapContainer, TileLayer, Popup, Rectangle, useMap, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import './james.css'
import L from 'leaflet'
//import MapBoxLayer  from './MapBoxLayer';



function ReturnHome({ center, zoom,  setReturnHome }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
    setReturnHome(false);
  }, [center, zoom,  map, setReturnHome]);

  return null;
}

export default function James() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [returnHome, setReturnHome] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const center = [38.87280, -94.78253];
  const homeZoom = 17
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
    setReturnHome(true)
  }

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
    }, 1); 
  
      return () => clearInterval(intervalId);
    }, []);
 
  return (
    <div className='home_page'>
      <div className='map_container'>
        <div className='home_button' onClick={handHomeButtonClick}>
          <img className='home_img' src="/ccsc_home_button_v3.png"  alt="Home Button" />
        </div>
        <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  
          />
          {/*<MapBoxLayer/>*/}
            <Rectangle
              bounds={bounds}
              pathOptions={{ color: 'blue', fillOpacity: 0.0, fillColor: 'blue' }}
              eventHandlers = {{click: handleLocationClick}}
            >
              <Popup>
                <strong>Bell Center </strong>
              </Popup>
            </Rectangle>
            {returnHome && <ReturnHome center={center} zoom={homeZoom} setReturnHome={setReturnHome} />}
            
            {userLocation && (
              <Marker position={userLocation} icon={customIcon}>
                <Popup>You're Here </Popup>
              </Marker>
             
            )
              
            }
        </MapContainer>
      </div>

      {showSidebar && (
        <div className="side_bar" >
          <h3>Bell Cultural Events Center</h3>
          <p> </p>
            <button onClick={() => setShowSidebar(false)}>Close</button>
        </div>
      )}
    </div>    
  );
}

