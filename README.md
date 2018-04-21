# Interacting with the Canvas + Web Audio API


#### The Canvas Element: 

A canvas is a single DOM element that encapsulates a picture.To create a new canvas, we first need a context. This object provides us a drawing interface. There are currently two supported styles: "2d" for two-dimensional graphics and WebGl for three-dimensional graphics:  


```Javascript

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

```
#### Drawing: 




