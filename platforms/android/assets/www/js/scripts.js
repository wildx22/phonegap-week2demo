// load API libraries
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs available
function onDeviceReady() {
	console.log(navigator.camera);
	console.log("navigator.geolocation works well");
	console.log(navigator.notification);
	var deviceProp = document.getElementById('deviceProperties');
	deviceProp.innerHTML = 'Device: ' + device.platform + ' ' + device.version;
}


// camera
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

// gps
function CurrentLocation() {
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError);
}
function GeoSuccess(position) {
	var location = document.getElementById('locationResult');
	var info = '<p>Latitude: ' + position.coords.latitude + '<br />' +
				'Longitude: ' + position.coords.longitude + '</p>';
	var map = '<p><img src="https://maps.googleapis.com/maps/api/staticmap?center=' + position.coords.latitude + ',' + position.coords.longitude + '&zoom=12&size=400x400" alt="map" class="img-responsive ui-shadow img-border" /></p>';
	location.innerHTML = info + map;
}
function GeoError(error) {
	alert('Error code: '    + error.code    + '\n' + error.message + '\n');
}

// device
function onPrompt(results) {
	var userAge = parseFloat(results.input1);
	if (userAge > 20) {
		alert('No offence but ' + userAge + ' is very old.');
	}
	else if (isNaN(userAge)) {
		alert('Please enter a valid age.');
	}
	else {
		alert('WHY HELLO.')
	}
}
function showPrompt() {
	navigator.notification.prompt('Please enter your age', onPrompt, 'Just checking...', ['Enter','Not telling']);
}