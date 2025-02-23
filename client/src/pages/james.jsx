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
          <h3>{name}</h3>
          <p> </p>
            <button onClick={() => setShowSidebar(false)}>Close</button>
        </div>
      )}
    </div>    
  );
}

/*import React, { useRef, useState }  from 'react';
import { MapContainer, TileLayer, Popup, Rectangle, useMapEvents, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet's default styles
import './james.css'

export default function James() {
    const center = [38.87680, -94.78253];
    const bounds = [
        [38.87630, -94.78213], // Southwest corner
        [38.87720, -94.78293]  // Northeast corner
    ];
    const bounds_Lunn_Hall = [
      [38.87460, -94.78193],
      [38.87495, -94.78233]
    ];


    const mapRef = useRef();
    
    const handleMapClick = (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      console.log('hi')
      const map = mapRef.current;
      if (map) {
        map.setView([lat, lng], map.getZoom())
      }
    };

    const [showSidebar, setShowSidebar] = useState(false)
    const [name, setName] = useState("")

    const handleLocationClick = (buildingTitle) => {
      setShowSidebar(true);
      setName(buildingTitle) ;
    };

  return (
    <div className='home_page'>
      <div className='map_container'>
        <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }} whenCreated={(map) => { mapRef.current = map }} onClick={handleMapClick}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
            <Rectangle
              bounds={bounds}
              pathOptions={{ color: 'blue', fillOpacity: 0.3, fillColor: 'blue' }}
              eventHandlers = {{click: () => handleLocationClick("Bell Cultural Events Center")}}
            >
              <Popup>
                <strong>Bell Center </strong>
              </Popup>
            </Rectangle>

            <Rectangle
              bounds={bounds_Lunn_Hall}
              pathOptions={{ color: 'blue', fillOpacity: 0.3, fillColor: 'blue' }}
              eventHandlers = {{click: () => handleLocationClick("Lunn Hall")}}
            >
              <Popup>
                <strong>Lunn Hall </strong>
              </Popup>
            </Rectangle>

        </MapContainer>
      </div>

      {showSidebar && (
        <div className="side_bar" >
          <h3>{name}</h3>
          <p> </p>
          <button onClick={() => setShowSidebar(false)}>Close</button>
        </div>
      )}
    </div>    
  );
}*/