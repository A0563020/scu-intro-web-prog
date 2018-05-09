var waterfall;
var w = 640;
var h = 480;

function setup() {
  createCanvas(w, h);
  // specify multiple formats for different browsers
  waterfall = createVideo("assets/backwardswaterfall1.mp4");
  waterfall.loop(); // set the video to loop and start playing                  
}


