// load API libraries
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("deviceready", onDeviceReady, false);
}
$('#photoResult').html('').hide();

// device APIs available
function onDeviceReady() {
	console.log(navigator.camera);
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoFail);
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
var GeoSuccess = function(position) {
	$('#location').html('Current location: ' + position.coords.latitude + position.coords.longitude);
	alert('Geolocation success!')
};

function GeoFail(error) {
	alert('Error ' + error.code + ' ' + error.message);
}
navigator.geolocation.getCurrentPosition(GeoSuccess, GeoFail);