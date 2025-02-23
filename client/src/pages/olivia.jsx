import React, { useState, useEffect } from "react";
import { MapContainer, ImageOverlay, useMap, Circle, Rectangle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import imageUrl from '../images/LayoutBell.png'
import './james.css'

export default function Olivia() {
    const bounds = [
        [40.704, -74.220],
        [40.782, -74.125],
    ];

    /*const room_button = [*/
    const position = [40.743, -74.176]
    const radius = 100

    const [showSidebar, setShowSidebar] = useState(false)
    const [showSidebar2, setShowSidebar2] = useState(false)
    const [name, setName] = useState("")

    const handleLocationClick = (roomTitle) => {
        setShowSidebar(true);
        setShowSidebar2(true);
        setName(roomTitle);
    };


    return (
        <div className='home_page'>
            <div className='map_container'>
                <MapContainer center={[40.743, -74.176]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                    <ImageOverlay url={imageUrl} bounds={bounds}/>
                    <Circle 
                    center={position} 
                    radius={radius} 
                    color='blue' 
                    fillOpacity={0.3} 
                    fillColor='blue'
                    eventHandlers = {{click: () => handleLocationClick("Mabee Performing Arts Hall")}}
                    >
                    <Popup>
                        <strong>101</strong>
                    </Popup>
                    </Circle>
                </MapContainer>
                </div>

                {showSidebar && showSidebar2 && (
                    <div className="side_bar" >
                    <h3>{name}</h3>
                    <p>This is MNU's auditorium, which is used to showcase the talents
                        of the Fine and Performing Arts students as well as local artists
                        and performing arts companies. This space is also used to hold 
                        numerous chapel gatherings throughout the semester.
                    </p>
                    <button onClick={() => setShowSidebar(false)}>Close</button>
                    </div>
                )}
            </div>
    );
};