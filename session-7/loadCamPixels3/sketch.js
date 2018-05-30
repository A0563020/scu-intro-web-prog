//src: http://creative-coding.decontextualize.com/video/

var w = 640;
var h = 480;
var cap;
var tracker
var w = 640, h = 480;
var face = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var browL = [15, 16, 17, 18];
var browR = [19, 20, 21, 22];
var eyeR = [23, 63, 24, 64, 25, 65, 26, 66, 23];
var pupilR = 27;
var eyeL = [30, 68, 29, 67, 28, 70, 31, 69];
var pupilL = 32;
var noseV = [33, 41, 62];
var noseW = [34, 35, 36, 42, 37, 43, 38, 39, 40];
var mouthWR = 44;
var mouthWL = 50;
var uppLipUp = [mouthWR, 45, 46, 47, 48, 49, mouthWL];
var uppLipBot = [mouthWR, 61, 60, 59, mouthWL];
var botLipUp = [mouthWR, 56, 57, 58, mouthWL];
var botLipBot = [mouthWR, 55, 54, 53, 52, 51, mouthWL];
var increment=0;

function setup() {
  createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(cap.elt);
}
function draw() {
  cap.loadPixels(); // loads the pixels to get the color attributes of each XY position
  //image(cap, 0, 0); // use this if you want the actual camera feed displayed - or just access the pixel values
  var positions = tracker.getCurrentPosition();
  var finderX = w/2;
  var finderY = h/2;
  
  if (positions) {
    finderX = positions[33][0]
    finderY = positions[33][1]
  }

  for (var y = 0; y < h; y += w/20) {
    for (var x = 0; x < w; x += h/20) {
      var pixVals = ((y*w)+x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
      push();
      translate(x, y);
      var a = atan2(finderY-y, finderX-x);
      rotate(a);
      strokeWeight((w+h)/200);
      stroke((cap.pixels[pixVals+2]+increment)%255, (cap.pixels[pixVals+1]+increment)%255, (cap.pixels[pixVals]+increment)%55) ; // filling each stroke with inverted colors
      fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2]); // filling each pixel as rect with rgb values 
      rect(0, 0, 15, 15);
      pop();

  	}
  }
  //updatePixels(); //updates after load - necessary only with canvas pixels? works without here
  increment +=1; //note to keep within %255 when using as color value
}