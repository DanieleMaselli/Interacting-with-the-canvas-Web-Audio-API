# Interacting with the Canvas + Web Audio API


#### The Canvas Element: 

A canvas is a single DOM element that encapsulates a picture. To create a new canvas, we first need a context. This object provides us a drawing interface. There are currently two supported styles: "2d" for two-dimensional graphics and WebGL for three-dimensional graphics:  


```Javascript

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

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






