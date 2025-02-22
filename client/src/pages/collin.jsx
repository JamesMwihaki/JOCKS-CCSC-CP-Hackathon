// Author: Collin Downey
// Date: 02/22/2025
// Description: A test page for making the filter and search bar
import './collin.css';
import 'list.js';

export default function Collin() {
    // Toggles the visibility of dropdown menu items
    // Takes an integer to select which dropdown to use
    function toggleDropdown(id) {
        let dropdownElements = document.getElementsByClassName('dropdown')[id].getElementsByClassName('dropdown-content');
        if (getComputedStyle(dropdownElements[1]).getPropertyValue('display') == 'none') {
            document.getElementsByClassName('dropdown')[id].style.setProperty('padding','0px 0px 15px 0px');
            for (let child=0;child<dropdownElements.length;child++) {
                dropdownElements[child].style.setProperty('display','block');
            }
        } else {
            document.getElementsByClassName('dropdown')[id].style.setProperty('padding','0px');
            for (let child=0;child<dropdownElements.length;child++) {
                dropdownElements[child].style.setProperty('display','none');
            }
        }
    }

    // Does a fuzzy search for rooms and buildings, then presents the results
    // Takes the current search
    function search(terms) {
        var options = {
            valueNames: ['Cunningham', 'Osborne', 'Bell'],
            fuzzySearch: {
                searchClass: "fuzzy-search",
                location: 0,
                distance: 100,
                threshold: 0.4,
                multiSearch: true
            }
        };
        var listObj = new List('list-id',options);
        console.log(listObj.fuzzySearch('ham'));
    }

    return(
        <>
            <ul className='navbar'>
                <input type="text" className="search" placeholder="&#x1F50D;&#xFE0E; Search" onChange={(e) => search(e)}></input>
                <li className="dropdown">
                    <p onClick={() => toggleDropdown(0)} className="filter">Buildings</p>
                    <p className="dropdown-content">Cunningham Center</p>
                    <p className="dropdown-content">Osborne</p>
                    <p className="dropdown-content">Bell Cultural Events Center</p>
                </li>
            </ul>  
        </>
    )
}