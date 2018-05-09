//src: http://creative-coding.decontextualize.com/video/

var w = 640;
var h = 480;
var increment = 0;
var decrement = w;
var cap;
var overlayA = 255;
var overlayB = 255;
function setup() {
  createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  noStroke();

}
function draw() {
  cap.loadPixels(); // loads the pixels to get the color attributes of each XY position
  for (var y = 0; y < h; y += 1) {
    for (var x = increment; x < increment+1; x += 1) {
      var pixVals = ((y*w)+x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
      fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2], overlayA); // filling each pixel with rgb values 
      rect(x, y, 1, 1);
  	}
  }
  for (var y = h; y > 0; y -= 1) {
    for (var x = decrement; x > decrement-1; x -= 1) {
      var pixVals = ((y*w)+x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
      fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2], overlayB); // filling each pixel with rgb values 
      rect(x, y, 1, 1);
    }
  }
  if(increment <= w){
    increment += 1;
    } else{
      increment = 0;
      }

  if(decrement >= 0){
    decrement -= 1;
    } else{
      decrement = w;
      }

  if(increment >= w/2){
    overlayA = 170;
    } else{
      overlayA = 171;
    }

  if(decrement <= w/2) {
    overlayB = 170;
    } else{
      overlayB = 171;
    }

}

