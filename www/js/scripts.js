// load API libraries
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("deviceready", onDeviceReady, false);
}
$('#photoResult').html('').hide();

// device APIs available
function onDeviceReady() {
	console.log(navigator.camera);
	alert('Device is ready!');
}

// camera app
function PhotoCamera() {
	TakePhoto(Camera.PictureSourceType.CAMERA);
}
function PhotoLibrary() {
	TakePhoto(Camera.PictureSourceType.PHOTOLIBRARY);
}

function PhotoSuccess(imageData) {
	var image = document.getElementById('profileImage');
	image.src = "data:image/jpeg;base64," + imageData;
	$('#photoResult').html('<em>Your photo has been updated!</em>').show().delay(3000).fadeOut();
}
function PhotoFail(error) {
	alert('Photo upload failed because: ' + error);
}

function TakePhoto(sourceType) {
	var camOptions = {
    	quality: 50,
    	destinationType: Camera.DestinationType.DATA_URL,
    	sourceType: sourceType,
    	correctOrientation: true,
    	allowEdit: true
	};
	navigator.camera.getPicture(PhotoSuccess, PhotoFail, camOptions);
}

// gps app
/*
var GeoSuccess = function(position) {
	$('#location').html('Current location: ' + position.coords.latitude + position.coords.longitude);
	alert('Geolocation success!')
};

function GeoFail(error) {
	alert('Error ' + error.code + ' ' + error.message);
}
navigator.geolocation.getCurrentPosition(GeoSuccess, GeoFail);
*/

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);