var canvas  = document.querySelector("#canvas");
var context = canvas.getContext('2d'); 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
	x: 0,
	y: 0
}

var audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();
var audio = new Audio();
audio.src = "audio.mp3";
audio.play();

var source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 1024;

var buffer = analyser.frequencyBinCount;
var data = new Uint8Array(buffer);

window.addEventListener('mousemove', 
	function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	 	
}); 

function drawCircle(x, y) {
	
	for(var i = 0; i < buffer; i++) { 
    	var v = data[i];
        context.beginPath();
        context.globalAlpha = 0.100;
        context.arc(x, y, v, 0, v);
        context.strokeStyle = "red";
        context.stroke();
	} 
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
	requestAnimationFrame(animate);
	analyser.getByteTimeDomainData(data);
	clear();
	drawCircle(mouse.x, mouse.y);
}

window.onload = animate();
