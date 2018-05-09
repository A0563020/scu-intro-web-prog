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
  background(10);
  image(cap, 0, 0, w, h);
  image(cap, (w-mouseX)/2, mouseY/2, w/2, h/2);
  image(cap, mouseX/3, (h-mouseY)/3, w/3, h/3);
  image(cap, (w-mouseX)/4, mouseY/4, w/4, h/4);
  image(cap, mouseX/5, (h-mouseY)/5, w/5, h/5);
}