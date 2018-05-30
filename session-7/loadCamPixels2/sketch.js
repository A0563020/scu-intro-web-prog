//src: http://creative-coding.decontextualize.com/video/

var w = 640;
var h = 480;
var cap;
var increment=0;

function setup() {
  createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
}
function draw() {
  cap.loadPixels(); // loads the pixels to get the color attributes of each XY position
  for (var y = 0; y < h; y += 20) {
    for (var x = 0; x < w; x += 20) {
      var pixVals = ((y*w)+x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
      strokeWeight(5);
      stroke((cap.pixels[pixVals+2]+increment)%255, (cap.pixels[pixVals+1]+increment)%255, (cap.pixels[pixVals]+increment)%255) ; // filling each stroke with inverted colors
      fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2]); // filling each pixel as rect with rgb values 
      rect(x, y, 15, 15);

  	}
  }
  //updatePixels(); //updates after load - necessary only with canvas pixels? works without here
  increment +=1; //note to keep within %255 when using as color value
}