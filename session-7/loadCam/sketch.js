//src: http://creative-coding.decontextualize.com/video/

var w = 640;
var h = 480;
var cap;
function setup() {
  createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
}
function draw() {
  image(cap, 0, 0, w, h);
}