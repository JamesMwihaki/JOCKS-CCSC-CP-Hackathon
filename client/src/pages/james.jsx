
import React, { useState }  from 'react';
import { MapContainer, TileLayer, Popup, Rectangle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet's default styles
import './james.css'

export default function James() {
    const center = [38.87680, -94.78253];
    const bounds = [
        [38.87630, -94.78213], // Southwest corner
        [38.87720, -94.78293]  // Northeast corner
    ];

    const [showSidebar, setShowSidebar] = useState(false)

    const handleLocationClick = () => {
      setShowSidebar(true); 
    };

  return (
    <div className='home_page'>
      <div className='map_container'>
        <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          

            <Rectangle
              bounds={bounds}
              pathOptions={{ color: 'blue', fillOpacity: 0.3, fillColor: 'blue' }}
              eventHandlers = {{click: handleLocationClick}}
            >
              <Popup>
                <strong>Bell Center </strong>
              </Popup>
            </Rectangle>
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
