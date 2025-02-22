import './collin.css';

export default function Collin() {
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

    return(
        <>
            <ul className='navbar'>
                <input type="text" className="search"></input>
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