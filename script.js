function saveLocalStorage() {
  // Check if the localStorage object exists
  if (localStorage) {
    // Store data
    var firstName = document.getElementById('fname').value;
    localStorage.setItem('firstName', firstName);
  } else {
    alert('Sorry, your browser do not support local storage.');
  }
}

function getLocalStorage() {
  //  Retreive Data
  console.log(localStorage.getItem('firstName'));
}

function saveSessionStorage() {
  if (sessionStorage) {
    // Store data
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    localStorage.setItem('first_name', first_name);
    localStorage.setItem('last_name', last_name);
  } else {
    alert('Sorry, your browser do not support session storage.');
  }
}

function getSessionStorage() {
  alert(
    'Hi, ' +
      localStorage.getItem('first_name') +
      ' ' +
      sessionStorage.getItem('last_name')
  );
}

function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}
/*--------------------- Canvas -----------------------*/
window.onload = function () {
  var canvas = document.getElementById('myLine');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'orange';
  context.lineWidth = 5;
  context.moveTo(50, 150);
  context.lineTo(250, 50);
  context.stroke();

  var canvas = document.getElementById('myRect');
  var context = canvas.getContext('2d');
  //  Code for Linear Gradient
  context.rect(50, 50, 200, 100);
  var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, '#8ED6FF');
  grd.addColorStop(1, '#004CB3');
  context.fillStyle = grd;
  context.fill();
  context.stroke();

  // Code for Radial Gradient
  // context.arc(150, 100, 70, 0, 2 * Math.PI, false);
  // var grd = context.createRadialGradient(150, 100, 10, 160, 110, 100);
  // grd.addColorStop(0, '#8ED6FF');
  // grd.addColorStop(1, '#004CB3');
  // context.fillStyle = grd;
  // context.fill();
  // context.stroke();

  var canvas = document.getElementById('myCircle');
  var context = canvas.getContext('2d');
  context.arc(150, 100, 70, 0, 2 * Math.PI, false);
  context.fillStyle = '#FB8B89';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = 'black';
  context.stroke();

  var canvas = document.getElementById('myArc');
  var context = canvas.getContext('2d');
  context.lineWidth = 10;
  context.strokeStyle = 'orange';
  context.lineCap = 'round';
  context.arc(150, 150, 80, 1.2 * Math.PI, 1.8 * Math.PI, false);
  context.stroke();
};


/* ------------------- Geo location function ---------------------- */
// Set up global variable
var result;

function showPosition() {
  // Store the element where the page displays the result
  result = document.getElementById('showPos');

  // If geolocation is available, try to get the visitor's position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    result.innerHTML = 'Getting the position information...';
  } else {
    alert('Sorry, your browser does not support HTML5 geolocation.');
  }
}

// Define callback function for successful attempt
function successCallback(position) {
  result.innerHTML =
    'Your current position is (' +
    'Latitude: ' +
    position.coords.latitude +
    ', ' +
    'Longitude: ' +
    position.coords.longitude +
    ')';
}

// Define callback function for failed attempt
function errorCallback(error) {
  if (error.code == 1) {
    result.innerHTML =
      "You've decided not to share your position, but it's OK. We won't ask you again.";
  } else if (error.code == 2) {
    result.innerHTML =
      "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.innerHTML =
      'The attempt timed out before it could get the location data.';
  } else {
    result.innerHTML = 'Geolocation failed due to unknown error.';
  }
}

var watchID;

function watchPosition() {
  if (navigator.geolocation) {
    watchID = navigator.geolocation.watchPosition(successCallback);
  } else {
    alert('Sorry, your browser does not support HTML5 geolocation.');
  }
}

function successCallback(position) {
  toggleWatchBtn.innerHTML = 'Stop Watching';

  // Check position has been changed or not before doing anything
  if (
    prevLat != position.coords.latitude ||
    prevLong != position.coords.longitude
  ) {
    // Set previous location
    var prevLat = position.coords.latitude;
    var prevLong = position.coords.longitude;

    // Get current position
    var positionInfo =
      'Your current position is (' +
      'Latitude: ' +
      position.coords.latitude +
      ', ' +
      'Longitude: ' +
      position.coords.longitude +
      ')';
    document.getElementById('watchPos').innerHTML = positionInfo;
  }
}

function startWatch() {
  var result = document.getElementById('watchPos');

  var toggleWatchBtn = document.getElementById('toggleWatchBtn');

  toggleWatchBtn.onclick = function () {
    if (watchID) {
      toggleWatchBtn.innerHTML = 'Start Watching';
      navigator.geolocation.clearWatch(watchID);
      watchID = false;
    } else {
      toggleWatchBtn.innerHTML = 'Aquiring Geo Location...';
      watchPosition();
    }
  };
}

function clearWatch() {
  navigator.geolocation.clearWatch(watchID);
}


/* -------------- Draggable functionality -------------------*/
function dragStart(ev) {
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target,0,0);
  return true;
}
function dragEnter(ev) {
  event.preventDefault();
  return true;
}
function dragOver(ev) {
  return false;
}
function dragDrop(ev) {
  var src = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(src));
  ev.stopPropagation();
  return false;
}