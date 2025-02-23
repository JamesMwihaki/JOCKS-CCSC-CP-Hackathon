// Author: Collin Downey
// Date: 02/22/2025
// Description: A test page for making the filter and search bar
import './collin.css';
import Fuse from 'fuse.js';

export default function Collin() {
    // Toggles the visibility of dropdown menu items
    // Takes an integer to select which dropdown to use
    function toggleDropdown(id) {
        let dropdownElements = document.getElementsByClassName('dropdown')[id].getElementsByClassName('dropdown-content');
        if (getComputedStyle(dropdownElements[1]).getPropertyValue('display') == 'none') {
            for (let child=0;child<dropdownElements.length;child++) {
                dropdownElements[child].style.setProperty('display','block');
            }
        } else {
            for (let child=0;child<dropdownElements.length;child++) {
                dropdownElements[child].style.setProperty('display','none');
            }
        }
    }

    function selectFilter(object) {
        let selectedTitle = object.target.innerHTML;
        if (object.target.parentElement.getElementsByClassName("selected").length != 0) {
            object.target.parentElement.getElementsByClassName("selected")[0].className = "dropdown-title";
            object.target.parentElement.getElementsByClassName("selected")[0].className = "dropdown-content";
        }
        if (object.target.parentElement.firstChild.innerHTML == selectedTitle) {
            object.target.parentElement.firstChild.innerHTML = object.target.parentElement.firstChild.id;
        } else {
            object.target.parentElement.firstChild.innerHTML = selectedTitle;
            object.target.className = "dropdown-content selected";
            object.target.parentElement.firstChild.className = "dropdown-title selected";
        }

    }

    // Does a fuzzy search for rooms and buildings, then presents the results
    // Takes the current search
    function search(key) {
        var options = [
            {
                building: "Bell",
                number: "135",
                name: "McIntire",
                type: "classroom",
                person: null
            },
            {
                building: "Bell",
                number: "118",
                name: null,
                type: "classroom",
                person: null
            },
            {
                building: "Osborne",
                number: "204",
                name: null,
                type: "classroom",
                person: null
            },
            {
                building: "Cunningham",
                number: "204",
                name: "Rexroth Collaboration Room",
                type: "Conference Room",
                person: null
            },
        ]
        if (document.getElementsByClassName('dropdown-title selected').length !=0) {
            for (let filter of document.getElementsByClassName('dropdown-title selected')) {
                console.log(filter.innerHTML);
            }
        }
        const fuse = new Fuse(options, {
            keys: ['building','name', 'number']
        })
        const results = fuse.search(key);
        if (key=="") {
            document.getElementById("results").innerHTML="";
        } else if (results.length == 0) {
            let outDiv = document.createElement('div');
            outDiv.className= "noResults";
            outDiv.innerHTML= "No locations matched your search";
            document.getElementById("results").innerHTML="";
            document.getElementById("results").appendChild(outDiv);
        } else {
            document.getElementById("results").innerHTML="";
            for (let result of results) {
                let data = result.item;
                let outText = "";
                let outDiv = document.createElement('div');
                outDiv.className = "result";
                if (data.name != null) {
                    outText += data.name + " (" + data.building + " " + data.number + ")"
                } else {
                    outText += data.building + " " + data.number;
                }
                outDiv.innerHTML = outText;
                document.getElementById("results").appendChild(outDiv);
            }
        }
    }

    return(
        <>
            <ul className='navbar'>
                <li className="searchBox">
                    <input type="text" className="search" placeholder="&#x1F50D;&#xFE0E; Search" onChange={(e) => search(e.target.value)}></input>
                    <div id="results"></div>
                </li>
                <li className="dropdown">
                    <p /*onClick={() => toggleDropdown(0)}*/ className="dropdown-title" id="Buildings">Buildings</p>
                    <p className="dropdown-content" onClick={(e) => selectFilter(e)}>Cunningham Center</p>
                    <p className="dropdown-content" onClick={(e) => selectFilter(e)}>Osborne</p>
                    <p className="dropdown-content" onClick={(e) => selectFilter(e)}>Bell Cultural Events Center</p>
                </li>
            </ul>  
        </>
    )
}