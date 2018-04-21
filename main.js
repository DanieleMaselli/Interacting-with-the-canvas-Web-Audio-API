var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var analyser;

//////////Audio Part ////////////////
var audio = new Audio();
audio.src = 'audio.mp3';
//create an Analyser Node 
var audioContext = new AudioContext();
analyser = audioContext.createAnalyser();
var source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 1024;
var buffer = analyser.frequencyBinCount / 2;
var data   = new Uint8Array(buffer);
audio.play();
/////////////////////////////////////
var mouse = {
	x: undefined,
	y: undefined
}
function draw() {
	var x;
    var y;
    var delta = canvas.width / buffer; 
    var fx = 0;
    var radius = 200;
    x = mouse.x;
    y = mouse.y;

    for(var i = 0; i < buffer; i++) {
    	var v = data[i] / 2;
    	if(v === 0) continue;
        context.beginPath();
        
		context.arc(x, y, v, fx, v);
		//context.lineTo(fx, v);
		context.strokeStyle = "white";
		context.stroke();
		fx += delta;
		console.log(v);
	
	}
	
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function animate(){
	requestAnimationFrame(animate);
	analyser.getByteTimeDomainData(data);
clear();	
draw();

}

window.addEventListener('mousemove', 
function(event) {
	
	mouse.x = event.x;
	mouse.y = event.y;
});

animate();

