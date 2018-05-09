var waterfall;
var canvas;
var w = 640;
var h = 480;

function setup() {
  canvass = createCanvas(w, h);
  // specify multiple formats for different browsers
  waterfall = createVideo("assets/backwardswaterfall1.mp4");
  waterfall.loop(); // set the video to loop and start playing                  
  waterfall.hide(); // by default video shows up in separate dom element. Hide it and draw it to the canvas
}

function draw() {
  background(150);
  image(waterfall,0,50); // draw the video frame to canvas
  filter('INVERT');
}


