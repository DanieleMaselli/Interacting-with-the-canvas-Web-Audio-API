# Interacting with the Canvas + Web Audio API


#### The Canvas Element: 

A canvas is a single DOM element that encapsulates a picture. To create a new canvas, we first need a context. This object provides us a drawing interface. There are currently two supported styles: "2d" for two-dimensional graphics and WebGL for three-dimensional graphics:  


```Javascript

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

```
#### Step 1: mousemove coordinates

To get the coordinates of our mouse on the screen, we first need to create an Event Listener. As an argument, we have to think about on which type of monitoring we want. In order to monitor the mouse position on the screen, we pass a mousemove argument to it and passed through an anonymouse function that is gonna be called each time the mouse is moving. The function is gonna take an event argument to get the coordinate, this is gonna return us an object. To get the actual x and y position of our mouse we are going to create an object with a initial value of undefined. 
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







