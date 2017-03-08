var connection = new RTCMultiConnection();
connection.setDefaultEventsForMediaElement = false;

connection.enumerateDevices(function(devices) {
	devices.forEach(appendOption);

	function appendOption(device) {
		var option = document.createElement('option');
		option.innerHTML = device.label || (device.kind + ': ' + device.deviceId);
		option.value = device.deviceId;

		if (device.kind.indexOf('audio') !== -1) {
			selectAudioDevices.appendChild(option);
		} else selectVideoDevices.appendChild(option);
	}
});

document.getElementById('select-device').onclick = function() {
	this.disabled = true;
	connection.selectDevices(selectAudioDevices.value, selectVideoDevices.value);
	connection.captureUserMedia();
};

var selectAudioDevices = document.getElementById('audio-devices');

connection.onstream = function(e) {
	videos.appendChild(e.mediaElement);
};