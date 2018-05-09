// Credits 
// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

p5.disableFriendlyErrors = true; // disable error check for performance



var canvas;
var cap;
var previousPixels;
var flow;
var w = 640, h = 480;
var step = 8;
var thresh = 5;
var flowZone = [];
var vegans = [];


function setup() {  
  canvas = createCanvas(w, h);
  //canvas.parent("canvas");

  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  
  flow = new FlowCalculator(step);
  
  for (i = 0; i < 50; i++) {
    vegans.push(new Vegan(Math.random() * width, Math.random() * height));
  }
  reset();
}

function draw() {
  // Make a new flow field with "resolution" of 'step'
  cap.loadPixels();
  if(cap.pixels.length > 0) {
    if(previousPixels) {

      // cheap way to ignore duplicate frames
      if(same(previousPixels, cap.pixels, 4, width)) {
        return;
      }
      
      flow.calculate(previousPixels, cap.pixels, w, h);
    }
    
    previousPixels = copyImage(cap.pixels, previousPixels);
    image(cap, 0, 0); // simply comment this out to hide image but still calculate - also can be used for effects
    
    if(flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
      
      //strokeWeight(2);
      //background(0, 10, 0); // no flicker if drawn here
      flow.flow.zones.forEach((zone) => {
        var pixVals = ((zone.y*windowWidth)+zone.x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
        strokeWeight((zone.u+zone.v)*0.2);
        stroke(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2]);
        line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);
        if (zone.x + zone.u > zone.x+thresh || zone.x + zone.u < zone.x-thresh ||
          zone.y + zone.v > zone.y+thresh || zone.y + zone.v < zone.y-thresh) {
          //console.log("zone.x= " + zone.x + " + zone.u= " +zone.u + " zone.y= " + zone.y + " + zone.v= " +zone.v);
          flowZone.push(zone); //place here to only fill array when there's movement over the threshold
        }
      })
    }
    noStroke();



    for (i = 0; i < vegans.length; i++) {
      vegans[i].applyBehaviors(vegans); // new function that combines forces/behaviors
      vegans[i].update();
      vegans[i].borders();
      vegans[i].display();

    }
  }
  fill(255, 255, 255);


  flowZone.length = 0; // must be reset each loop or it will accumulate
}

function lookup(lookupX, lookupY){
  //console.log(flowZone.length);
  if (flowZone.length > 0) {
    for (var i = 0; i < flowZone.length; i++){
      // hard-coded the step value (8*2)+1
      if ((flowZone[i].x <= lookupX && flowZone[i].x+flowZone[i].u > lookupX && Math.abs(flowZone[i].y - lookupY) <= 17) || (flowZone[i].x >= lookupX && flowZone[i].x+flowZone[i].u < lookupX && Math.abs(flowZone[i].y - lookupY) <= 17) || (flowZone[i].y <= lookupY && flowZone[i].y+flowZone[i].v > lookupY && Math.abs(flowZone[i].x - lookupX) <= 17) || (flowZone[i].y >= lookupY && flowZone[i].y+flowZone[i].v < lookupY && Math.abs(flowZone[i].x - lookupX) <= 17)) {
        //console.log(lookupX + " " + lookupY + " " + flowZone[i].x + " " + flowZone[i].y);
        //console.log(flowZone[i].u + " " + flowZone[i].v);
        var opForce = createVector(flowZone[i].u, flowZone[i].v);
        return opForce;
      } 
    }
    return createVector(0, 0);
  }
  else {
    return createVector(0, 0);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function reset() {
    setTimeout(function() {
    flowZone = [];
    vegans = [];
    setup();
  }, 300000);
}

