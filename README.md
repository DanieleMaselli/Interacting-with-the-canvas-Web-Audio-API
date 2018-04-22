# Interacting with the Canvas + Web Audio API


#### The Canvas Element: 

A canvas is a single DOM element that encapsulates a picture. To create a new canvas, we first need a context. This object provides us a drawing interface. There are currently two supported styles: "2d" for two-dimensional graphics and WebGL for three-dimensional graphics:  


```Javascript

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
```
This method is gonna determine the available `width` and `height` of the browser window's content area. 

```Javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

```
#### Step 1: mousemove coordinates

To get the x, y coordinates of our mouse, we first need to create an EventListener on the DOM Element representing the screen (window). An EventListener is a function that will get called whenever an event occurs on a DOM Element. To attach an EventListener we need to call the function `<DOMElement>.addEventListener` with two arguments. The first argument is a string with the name of the `<event>` we want to monitor (in this case 'mousemove'). The second argument is the `handler` function. The handler function `must` take as first argument the event object (representing the event for that unit of time). Within the handler the `eventObject` contains the x, y values that we need. We then store this values in a global object. The handler is fired asynchronously so once the handler is attached we "forget about it" and from others part of our code we can reference the global object (updated by the handler).
```Javascript
var mouse = {
	x: 0,
	y: 0
};

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	 	
});
```

#### Step 2: Draw on Canvas 

To draw a circle that interacts with our mouse position, we need to declare a function `drawCircle`. This function is going to have two parameters (x, y), this refers to the coordinate where the circle is going to be drawn on the canvas. Inside the function `body`, which contains the statements that are to be executed, we call the `arc` method on the drawing `context` (canvas) that is used to create circles. But to actually draw the circle, we have to create a function `animate`. Inside the body of animate, we call the `requestAnimationFrame` method. This method tells the browser that an animation is going to be performed, with a number of `callbacks` that is usually 60 calls per second. Inside the `animate` function we call now our previous defined function `drawCircle` and set two arguments of the mouse object `drawCircle(mouse.x, mouse.y)`, this will draw our circle at the position of the mouse cursor. The last step is to declare a `clear` function which invokes the `clearRect` method on the context and erase the canvas every time `animate` is executed.  



```Javascript
function drawCircle(x, y) {
        context.beginPath();
	context.arc(x, y, 50, 0, 2*Math.PI);
	context.strokeStyle = "black";
	context.stroke();
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
	requestAnimationFrame(animate);
	clear();
	drawCircle(mouse.x, mouse.y);
}

animate();
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
#### Merge Web Audio APi and Canvas

Our goal is to interact the moving circle with the audio source. In order to do this, we need to declare a variable that is setting up the `buffer`. 
```Javascript
var buffer = analyser.frequencyBinCount;
```
Next we declare the `data` variable with our `buffer` variable as an argument:
```Javascript
var data = new Uint8Array(buffer);
```
We now run with a `for loop` inside our `drawCircle` function. The `loop` is going to wrap the drawing `context` within the body. The loop is going to be initialized by defining a variable, and then, in the expression part, we check whether the loop must continue based on our `buffer` and updating the loop every iteration. We then define a variable `v`(value) that is equal to an array.  
```Javascript
function drawCircle(x, y) {
	
	for(var i = 0; i < buffer; i++) { 
    	var v = data[i];
        context.beginPath();
        context.arc(x, y, v, 0, v);
        context.strokeStyle = "black";
	context.stroke();
	
	} 
}
```
Last step is to grap the `analyser.getByteTimeDomainData` an copy it to our array.
```Javascript
function animate() {
	requestAnimationFrame(animate);
	analyser.getByteTimeDomainData(data);
	clear();
	drawCircle(mouse.x, mouse.y);
}

window.onload = animate();
```
## useful links

[I'm an inline-style link](https://developer.mozilla.org/de/docs/Web/API/Web_Audio_API)











