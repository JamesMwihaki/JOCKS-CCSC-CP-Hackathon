import './common.css';
import './sage.css';

export default function Sage() {
    // Initial window size
console.log("Initial width:", window.innerWidth);
console.log("Initial height:", window.innerHeight);

// Event listener for window resize
window.addEventListener("resize", function() {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  console.log("Window resized. Width:", currentWidth, "Height:", currentHeight);

  const sideBar = document.getElementById('sideBar');

  // You can perform actions based on the new window size here
  if (currentWidth < 568) {
    // Example: Apply mobile-specific styling or logic
    console.log("Mobile view");
    sideBar.style.display = 'inline-block';
  } else {
    // Example: Apply desktop-specific styling or logic
    console.log("Desktop view");
  }
  
  const myDiv = document.getElementById('myDiv');
  myDiv.addEventListener('click', function() {
  myDiv.classList.toggle('vertical');
});
});
    return(
        <>
        <div className='sidebar'>
            <div className= "image"><div className='bell'></div></div>
            <h1 className="h1">Bell Cultural Events Center</h1>
            <div className='interior_button'>View Interior</div>
            <p className='body'>The 40,000 square foot Bell Cultural Events Center is a busy complex, hosting over 320 events representing more than 70,000 guests throughout the year, not including regular classes. The center is used to showcase the talents of the MNU Fine and Performing Arts students and local artists and performing arts companies, and is available for use by the surrounding community as well as the Kansas City metro.</p>
        </div>
        <div className='sidebar'>
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
        </> 
    )
}

