// load API libraries
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}
$('#photoResult').html('').hide();

// device APIs available
function onDeviceReady() {
	console.log(navigator.camera);
	alert('Device is ready!');
}

function PhotoCamera() {
	TakePhoto(Camera.PictureSourceType.CAMERA);
}
function PhotoLibrary() {
	TakePhoto(Camera.PictureSourceType.PHOTOLIBRARY);
}

function onSuccess(imageData) {
	var image = document.getElementById('profileImage');
	image.src = "data:image/jpeg;base64," + imageData;
	$('#photoResult').html('<em>Your photo has been updated!</em>').show().delay(3000).fadeOut();
}
function onFail(message) {
	alert('Photo upload failed because: ' + message);
}

function TakePhoto(sourceType) {
	var camOptions = {
    	quality: 50,
    	destinationType: Camera.DestinationType.DATA_URL,
    	sourceType: sourceType,
    	correctOrientation: true,
    	allowEdit: true
	};
	navigator.camera.getPicture(onSuccess, onFail, camOptions);
}