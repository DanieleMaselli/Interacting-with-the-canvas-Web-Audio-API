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
audio.src = "fra.wav";
audio.play();

var source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 1024;

var bufferLenght = analyser.frequencyBinCount;
var buffer = new Uint8Array(bufferLenght);



window.addEventListener('mousemove', 
	function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	 	
}); 

function drawCircle(x, y) {
	
	for(var i = 0; i < bufferLenght; i++) { 
    		var v = buffer[i];
        	context.beginPath();
        	context.arc(x, y, v, 0, v);
		context.strokeStyle = "black";
		context.stroke();
    } 
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
	requestAnimationFrame(animate);
	analyser.getByteTimeDomainData(buffer);
	clear();
	drawCircle(mouse.x, mouse.y);
}

animate();
