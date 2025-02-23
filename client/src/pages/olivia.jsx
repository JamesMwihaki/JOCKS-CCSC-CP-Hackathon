import React from "react";
import { MapContainer, ImageOverlay, useMap, Circle, Rectangle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import imageUrl from '../images/LayoutBell.png'

export default function Olivia() {
    const bounds = [
        [40.704, -74.220],
        [40.782, -74.125],
    ];

    /*const room_button = [*/
    const position = [40.743, -74.176]
    const radius = 100

    const handleLocationClick = (roomTitle) => {

    };


    return (
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
    );
};