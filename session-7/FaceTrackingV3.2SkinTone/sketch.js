// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var canvas;
var cap;
var tracker;
var rVals = 0;
var gVals = 0;
var bVals = 0;
var aVals = 0;
var rAve;
var bAve;
var gAve;
var aAve;
var index = 0;
var w = 720, h = 450;

function setup() {
  canvas = createCanvas(w, h);
  //pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  
  //colorMode(HSB);
  
  tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("blend", "sobel");
  tracker.start(cap.elt);
  //noStroke();
}

function draw() {
  //image(cap, 0, 0, w, h);
  background(255);
  var positions = tracker.getCurrentPosition(); 
  cap.loadPixels();
  
  //noFill();
  stroke(255);
  
  //console.log(cap.pixels);
  if(positions.length > 0) {
    beginShape();
    var x1Int = Math.floor(positions[1][0])+30;
    var y1Int = Math.floor(positions[1][1])+30;
    var x2Int = Math.floor(positions[36][0]);
    var y2Int = Math.floor(positions[36][1])+10;
    //console.log(y2Int);
    for (var j = y1Int; j <= y2Int; j++){
      for (var k = x1Int; k <= x2Int; k++){
      //console.log("x = " + k);
      //console.log("y = " + j);
      var pixVals = (k+j*w)*4;
      rVals= rVals + cap.pixels[pixVals];
      gVals = gVals + cap.pixels[pixVals+1];
      bVals = bVals + cap.pixels[pixVals+2];
      aVals = aVals + cap.pixels[pixVals+3];
      index++;
      }
    }

    for (var i=0; i<23; i++) {
      vertex(positions[i][0], positions[i][1]); //appear to be x/y min/max of each tag
    }
    vertex(positions[22][0], positions[22][1]);
    vertex(positions[18][0], positions[18][1]);
    vertex(positions[19][0], positions[19][1]);
    vertex(positions[0][0], positions[0][1]);

    rAve = rVals/index;
    gAve = gVals/index;
    bAve = bVals/index;
    aAve = aVals/index;

    endShape();
    
    //console.log("rVals " + rVals + " index " + index + " rAve " + rAve);
    //console.log("rAve " + rAve + " gAve " + gAve + " bAve " + bAve);

      //  for (var i=0; i<positions.length; i++) {
    fill(rAve, gAve, bAve, aAve);
    ellipse(50, 100, 40, 40);
    strokeWeight(4);
    stroke(10);
    line(x1Int, y1Int, x2Int, y2Int);
    //text(i, positions[i][0], positions[i][1]);
  //}
    }
  

  rVals = 0;
  bVals = 0;
  gVals = 0;
  index = 0;
  
  //clear();
}

/*

  */
