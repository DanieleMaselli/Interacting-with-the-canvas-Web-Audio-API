# Interacting with the Canvas + Web Audio API


#### The Canvas Element: 

A canvas is a single DOM element that encapsulates a picture. To create a new canvas, we first need a context. This object provides us a drawing interface. There are currently two supported styles: "2d" for two-dimensional graphics and WebGL for three-dimensional graphics:  


```Javascript

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

```
#### Step 1: Moving a circle with mousemove

To start drawing into our canvas we are going to define a function



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







