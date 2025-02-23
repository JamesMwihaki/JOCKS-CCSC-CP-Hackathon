// Author: Collin Downey
// Date: 02/22/2025
// Description: A test page for making the filter and search bar
import './collin.css';
import Fuse from 'fuse.js';
import axios from 'axios';
import { useEffect } from 'react';

export default function Collin() {
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
        </>
    )
}