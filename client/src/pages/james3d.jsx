import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


// Put your access token in an environment variable or safer location in production.
mapboxgl.accessToken =
  'pk.eyJ1Ijoiam1zbXdoayIsImEiOiJjbTdoMmlwbGMwZTl1MmxwdnkxM253MDBnIn0.mhP_6OqqgTQpPwCacAL2hA';

function Place_marker({ loc, map, marker}) {
  console.log("place maker user location", loc)
  console.log("test1", map)
  //place marker on the map
  const offset = [-0, -16];
    
  // custom marker.
  const el = document.createElement('div');
  el.style.backgroundImage = 'url(/user_location.png)';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.backgroundSize = 'contain';
  el.style.backgroundRepeat = 'no-repeat';

  if (marker.current) {
    marker.current.setLngLat(loc);
  } else {
    marker.current = new mapboxgl.Marker({ element: el, offset: offset })
      .setLngLat(loc)
      .setPopup(new mapboxgl.Popup().setHTML("<strong>You're Here</strong>"))
      .addTo(map);
  }
}


function renderPolygon({
  map,
  coordinates,
  sourceId = 'custom-polygon-source',
  layerId = 'custom-polygon-layer',
  fillColor = '#0000FF',
  fillOpacity = 1.0,
  popupHTML = 'Polygon Popup',
  onClickCallback
}) {
  if (!map) {
    console.error('Map instance is required.');
    return;
  }

  const polygonFeature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates]
    }
  };

  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: polygonFeature
    });
  } else {
    map.getSource(sourceId).setData(polygonFeature);
  }

  if (!map.getLayer(layerId)) {
    map.addLayer({
      id: layerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': fillColor,
        'fill-opacity': fillOpacity
      }
    });
  }

  map.off('click', layerId, handlePolygonClick); 

  function handlePolygonClick(e) {
    
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(popupHTML)
      .addTo(map);

    if (typeof onClickCallback === 'function') {
      onClickCallback(e);
    }
  }

  map.on('click', layerId, handlePolygonClick);
}

export default function James3D() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [returnHome, setReturnHome] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null)

  // Set initial map center and zoom. Mapbox GL expects [lng, lat]
  const center = [-94.78283, 38.87635];
  //const center = [-94.9517183, 38.9738527]
  const homeZoom = 16;

  const handHomeButtonClick = () => {
    setReturnHome(true);
  };

  // Initialize the map
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: homeZoom,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    // When the style loads, add 3D buildings and the rectangle layer.
    mapRef.current.on('style.load', () => {
      const layers = mapRef.current.getStyle().layers;
      const labelLayer = layers.find(
        layer =>
          layer.type === 'symbol' &&
          layer.layout &&
          layer.layout['text-field']
      );
      const labelLayerId = labelLayer ? labelLayer.id : undefined;

      // Add 3D buildings layer.
      mapRef.current.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );

      //buildings coordinates 
      const bellCoordinates = [
        [-94.78303, 38.87635], // bottom-left
        [-94.78213, 38.87635], // bottom-right
        [-94.78213, 38.87740], // top-right
        [-94.78300, 38.87740], // top-left
        [-94.78303, 38.87635]  // closing point (same as bottom-left)
      ];


      const dobsonCoordinates = [
        [-94.78170, 38.87695], // bottom-left (approx)
        [-94.78137, 38.87695], // bottom-right (approx)
        [-94.78137, 38.87658], // top-right    (approx)
        [-94.78170, 38.87658], // top-left     (approx)
        [-94.78170, 38.87685],  // closing point
      ];
    
      renderPolygon({
        map: mapRef.current,
        coordinates: bellCoordinates,
        sourceId: 'bell-source',
        layerId: 'bell-layer',
        fillColor: 'blue',
        fillOpacity: 1.0,
        popupHTML: '<strong>Bell Cultural Events Center</strong>',
        onClickCallback: () => setShowSidebar(true)
      });

      renderPolygon({
        map: mapRef.current,
        coordinates: dobsonCoordinates,
        sourceId: 'dobson-source',
        layerId: 'dobson-layer',
        fillColor: 'red',
        fillOpacity: 1.0,
        popupHTML: '<strong> dobson Hall Center</strong>',
        onClickCallback: () => setShowSidebar(true)
      });

    });

    // Cleanup on unmount.
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [center, homeZoom]);

  
  //continuously watching user location
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const loc = [position.coords.longitude, position.coords.latitude];
        console.log("User location update:", loc);
        Place_marker({ loc, map: mapRef.current, marker: markerRef });
      },
      (error) => {
        console.error("Error watching geolocation:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [mapRef, markerRef]);

  // Effect for handling "Return Home" functionality
  useEffect(() => {
    if (returnHome && mapRef.current) {
      mapRef.current.flyTo({
        center: center,
        zoom: homeZoom,
        essential: true,
      });
      setReturnHome(false);
    }
  }, [returnHome, center, homeZoom, mapRef]);
    

  return (
    <div className="home_page">
      <div className="map_container" style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <div className="home_button" onClick={handHomeButtonClick}>
          <img className="home_img" src="/ccsc_home_button_v3.png" alt="Home Button" />
        </div>
        <div
          ref={mapContainerRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
          }}
        />
      </div>
     
      {/* Sidebar */}
      {showSidebar && (
        <div className="side_bar">
          <h3>Bell Cultural Events Center</h3>
          <p>Some details about the Bell Center...</p>
          <button onClick={() => setShowSidebar(false)}>Close</button>
        </div>
      )}
    </div>
  );
}