import React from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import imageUrl from './Untitled.png';

const MyMap = () => {
  const bounds = [
    [40.712, -74.227], // Top left coordinates
    [40.774, -74.125], // Bottom right coordinates
  ];

    return (
      <MapContainer center={[40.743, -74.176]} zoom={13} style={{ height: '500px', width: '400px' }}>
        <ImageOverlay url={imageUrl} bounds={bounds} />
      </MapContainer>
    );
};

export default MyMap;