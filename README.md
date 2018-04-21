# Interacting with the Canvas + Web Audio API


#### The Canvas Element: 

A canvas is a single DOM element that encapsulates a picture. To create a new canvas, we first need a context. This object provides us a drawing interface. There are currently two supported styles: "2d" for two-dimensional graphics and WebGL for three-dimensional graphics:  


```Javascript

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

```
#### Step 1: mousemove coordinates

To get the x, y coordinates of our mouse, we first need to create an EventListener on the DOM Element representing the screen (window). An EventListener is a function that will get called whenever an event occurs on a DOM Element. To attach an EventListener we need to call the function `<DOMElement>.addEventListener` with two arguments. The first argument is a string with the name of the `<event>` we want to monitor (in this case 'mousemove'). The second argument is the `handler` function. The handler function `must` take as first argument the event object (representing the event for that unit of time). Within the handler the `eventObject` contains the x, y values that we need. We then store this values in a global object. The handler is fired asynchronously so once the handler is attached we "forget about it" and from others part of our code we can reference the global object (updated by the handler).
```Javascript
var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', 
	function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	 	
}); 
```

#### Step 2: Draw on Canvas 
```Javascript
function waveCircle() {
	var x;
	var y;
		x = mouse.x;
		y = mouse.y;
    context.beginPath();
	context.arc(x, y, 50 , 0, 2*Math.PI);
	context.strokeStyle = "black";
	context.stroke();
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
	requestAnimationFrame(animate);
	clear();
	waveCircle();
}

animate();

``





#### Web Audio API: 

The Web Audio API provides a variety of features that allow developers to select audio sources, add effects to them, generate visualizations, playing sounds and much more.

#### Visualizations with the Web Audio API: 

The canvas element in combination with the Web Audio Api gives us a cool way to generate visual on the browser. To create a visual effect we first need an Analyser Node.
```Javascript
var audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();
```
Once the AudioContext.createAnalyser() method creates an AnalyserNode, we can start to extract the data from our audio source.
But first, we have to create our audio object to get the actual source. 
```Javascript
var audio = new Audio();
audio.src = 'audio.mp3';
audio.play();
```
Once we defined our audio variable, we can now connect the Node and the destination. 
```Javascript
var source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
```







