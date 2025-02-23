import './home.css';
import './collin.css';
import Fuse from 'fuse.js';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/*-------------------
---- JAMES' CODE ----
-------------------*/

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

export default function TestHome() {
    /*-------------------
    --- COLLIN'S CODE ---
    -------------------*/
    useEffect(() => { // Functions to trigger on load
        // Gets list of possible buildings from the database and fills the "Buildings" dropdown with them
        axios.get('http://localhost:3000/buildings/buildings').then(res => {
            let dropdownOptions = document.getElementById("buildings_locations").parentElement;
            while (dropdownOptions.children.length>1) { // Clears previous elements from list
                dropdownOptions.removeChild(dropdownOptions.lastChild);
            }
            for (let building of res.data) { // Iterates through all buildings
                // Creates clickable option
                let buildingOption = document.createElement('p');
                buildingOption.className = "dropdown-content";
                buildingOption.onclick = (e) => selectFilter(e);
                buildingOption.defaultTitle = "Buildings";
                buildingOption.innerHTML = building.buildings_locations;
                document.getElementById("buildings_locations").parentElement.appendChild(buildingOption); // Puts option into the dropdown menu
            }
        })
    })

    // Toggles the visibility of dropdown menu items
    // Takes an integer to select which dropdown to use
    function toggleDropdown(id) {
        let dropdownElements = document.getElementsByClassName('dropdown')[id].getElementsByClassName('dropdown-content');
        if (getComputedStyle(dropdownElements[1]).getPropertyValue('display') == 'none') { // Tests if dropdown is currently visible
            for (let child=0;child<dropdownElements.length;child++) {
                dropdownElements[child].style.setProperty('display','block'); // Makes dropdown visible
            }
        } else {
            for (let child=0;child<dropdownElements.length;child++) {
                dropdownElements[child].style.setProperty('display','none'); // Makes dropdown invisible
            }
        }
    }

    // Allows the user to select a filter from a dropdown menu
    // Takes the clicked filter from the dropdown menu and adds/removes the "selected" status to it
    function selectFilter(object) {
        let selectedTitle = object.target.innerHTML;
        if (object.target.parentElement.getElementsByClassName("selected").length != 0) { // Checks if any options are selected then clears them
            object.target.parentElement.getElementsByClassName("selected")[0].className = "dropdown-title";
            object.target.parentElement.getElementsByClassName("selected")[0].className = "dropdown-content";
        }
        if (object.target.parentElement.firstChild.innerHTML == selectedTitle) { // Checks if the option is already selected, then clears it
            object.target.parentElement.firstChild.innerHTML = object.target.parentElement.className.split(" ").splice(-1)[0].replace("_"," ");
        } else { // If option wasn't already selected, it becomes selected
            object.target.parentElement.firstChild.innerHTML = selectedTitle;
            object.target.className = "dropdown-content selected";
            object.target.parentElement.firstChild.className = "dropdown-title selected";
        }

    }

    // Does a fuzzy search for rooms and buildings, then presents the results
    // Takes the current search
    function search(key) {
        axios.get('http://localhost:3000/rooms/').then(res => { // Gets all the data from the rooms table
            var options = res.data;
            if (document.getElementsByClassName('dropdown-title selected').length !=0) { // Checks for selected filters
                for (let filter of document.getElementsByClassName('dropdown-title selected')) { // Applies filters to table data
                    options = options.filter((option) => (option[`${filter.id}`] == filter.innerHTML) || (option[`${filter.id}`] == filter.innerHTML.toLowerCase()));
                }
            }
            const fuse = new Fuse(options, { // Creates fuzzy search setup
                keys: ['buildings_locations','room_number', 'room_name']
            })
            const results = fuse.search(key); // Performs fuzzy search using text entered in the search bar
            if (key=="") { // Check for if there is any text entered, if none, it clears the results
                document.getElementById("results").innerHTML="";
            } else if (results.length == 0) { // Checks if there are any matching results, if none, it tells the user there are none
                let outDiv = document.createElement('div');
                outDiv.className= "noResults";
                outDiv.innerHTML= "No locations matched your search";
                document.getElementById("results").innerHTML="";
                document.getElementById("results").appendChild(outDiv);
            } else { // This creates a series of elements that contain the relevant information for the matches and displays them
                document.getElementById("results").innerHTML=""; // Clears current search
                for (let result of results) { // Loops for every match
                    let data = result.item;
                    let outText = "";
                    let outDiv = document.createElement('div');
                    outDiv.className = "result";
                    outDiv.onclick = (e) => resultSelect(e);
                    if (data.name != null) { // Creates text to appear
                        outText += data.room_name + " (" + data.buildings_locations + " " + data.room_number + ")"
                    } else {
                        outText += data.buildings_locations + " " + data.room_number;
                    }
                    outDiv.innerHTML = outText;
                    document.getElementById("results").appendChild(outDiv); // Displays data
                }
            }
        })

    }

    // Detects user's selection of location then gives feedback showing the selection
    // Takes the clicked selection
    function resultSelect(selection) {
        selection.target.parentElement.previousSibling.value=selection.target.innerHTML;
        search("");
    }

    /*-------------------
    ---- JAMES' CODE ----
    -------------------*/
    const [showSidebar, setShowSidebar] = useState(false);
    const [returnHome, setReturnHome] = useState(false);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null)
    const [name, setName] = useState("")
  
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











    return(
        <>
        <ul className='navbar'>
                <li className="searchBox">
                    <input type="text" className="search" placeholder="&#x1F50D;&#xFE0E; Search" onClick={(e) => search(e.target.value)} onChange={(e) => search(e.target.value)}></input>
                    <div id="results"></div>
                </li>
                <li className="dropdown Buildings">
                    <p className="dropdown-title" id="buildings_locations">Buildings</p>
                </li>
                <li className="dropdown Room_Type">
                    <p className="dropdown-title" id="room_type">Room Types</p>
                    <p className="dropdown-content" onClick={(e) => selectFilter(e)}>Classroom</p>
                    <p className="dropdown-content" onClick={(e) => selectFilter(e)}>Conference Room</p>
                    <p className="dropdown-content" onClick={(e) => selectFilter(e)}>Office</p>
                </li>
            </ul>  

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
            <h3>{name}</h3>
            <p>Some details about the Bell Center...</p>
            <button onClick={() => setShowSidebar(false)}>Close</button>
            </div>
        )}
        </div>
        </>
    );
}