import React, { useState, useEffect }  from 'react';
import './common.css';
import './sage.css';
import { MapContainer, TileLayer, Popup, Rectangle, useMap, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import './james.css'
//import MapBoxLayer  from './MapBoxLayer';

function ReturnHome({ center, zoom,  setReturnHome }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
    setReturnHome(false);
  }, [center, zoom,  map, setReturnHome]);

  return null;
}

export default function Sage() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [returnHome, setReturnHome] = useState(false)
  const center = [38.87280, -94.78253];
  const homeZoom = 17
  const bounds = [
      [0, -94.78213], 
      [38.87715, -94.78283]  
  ];

  const handleLocationClick = () => {//when action, sidebar
    setShowSidebar(true); 
  };

  const handHomeButtonClick = () => {
    setReturnHome(true)
  }

    return(
        <>
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
        </MapContainer>
      </div>
    </div> 
        {showSidebar && (
            <div className='sidebar'>
            <button className = 'closebutton' onClick={() => setShowSidebar(false)}>X</button>
            <div className= "image"><div className='bell'></div></div>
            <h1 className="h1">Bell Cultural Events Center</h1>
            <div className='interior_button'>View Interior</div>
            <p className='body'>The 40,000 square foot Bell Cultural Events Center is a busy complex, hosting over 320 events representing more than 70,000 guests throughout the year, not including regular classes. The center is used to showcase the talents of the MNU Fine and Performing Arts students and local artists and performing arts companies, and is available for use by the surrounding community as well as the Kansas City metro.</p>
        </div>
        )}
        {showSidebar && (
        <div className='sidebar'>
            <button className = 'closebutton' onClick={() => setShowSidebar(false)}>X</button>
            <h2>Bell Cultural Events Center</h2>
            <h1 className="h1">Rooms</h1>
            <div className='rooms_body'>
                <li className='room_items'>Jones-117</li>
                <li className='room_items'>Mabee-104</li>
                <li className='room_items'>Black Box Theater-134</li>
                <li className='room_items'>Jones-117</li>
                <li className='room_items'>Mabee-104</li>
                <li className='room_items'>Black Box Theater-134</li>
                <li className='room_items'>Jones-117</li>
                <li className='room_items'>Mabee-104</li>
                <li className='room_items'>Black Box Theater-134</li>
                <li className='room_items'>Jones-117</li>
                <li className='room_items'>Mabee-104</li>
                <li className='room_items'>Black Box Theater-134</li>
                <li className='room_items'>Jones-117</li>
                <li className='room_items'>Mabee-104</li>
                <li className='room_items'>Black Box Theater-134</li>
            </div>
        </div>
        )}
        </> 
    )
}

