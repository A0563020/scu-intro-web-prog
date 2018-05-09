var img;
var w = 640;
var h = 480;

function setup() {
  createCanvas(w, h);
  // specify multiple formats for different browsers
  img = loadImage("assets/stylenet-bacon.gif");
}

function draw() {
  image(img,0,0); // draw the video frame to canvas
  image(img,0, h/2 ,img.width/2, img.height/2); // draw a second copy to canvas
}