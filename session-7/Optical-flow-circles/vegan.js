
// The "Vegan" constructor

function Vegan(x, y) {
  this.position = createVector(x, y);
  this.r = Math.random() * 5 + 10;
  this.maxspeed = 2;    // Maximum speed
  this.maxforce = 0.2;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.targdists = []; // array of target distances
  //this.lineto = createVector(0, 0); //draws line to target
  this.isattacked = false;
  this.flowMem = createVector(0, 0);
  

  this.applyBehaviors = function(vegans) {

    var separateForce = this.separate(vegans);
    var flowForce = this.flow(flow);

    separateForce.mult(1);
    flowForce.mult(5);

    this.applyForce(separateForce);
    this.applyForce(flowForce);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby vegans and steers away
  this.separate = function(vegans) {
    var desiredseparation = this.r + 20;
    var sum = createVector();
    var count = 0;
    // For every agent in the system, check if it's too close
    for (var j = 0; j < vegans.length; j++) {
      var dist = p5.Vector.dist(this.position, vegans[j].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((dist > 0) && (dist < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, vegans[j].position);
        diff.normalize();
        diff.div(dist);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  this.flow = function() {
    // What is the vector at that spot in the flow field?
    var desired = lookup(this.position.x, this.position.y);
    desired.normalize();
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);

    // Steering is desired minus velocity
    this.flowMem.add(desired);
    
    var steered = this.velocity.add(desired);
    steered.limit(this.maxforce);  // Limit to maximum steering force
  
    return steered;
  }

  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    //this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);

    this.flowMem.mult(0.9); //simulate lasting effect of the CV "hit"

    if (Math.abs(this.flowMem.x) && Math.abs(this.flowMem.y) <= 0.1 ) {
      this.flowMem.mult(0);
    }

    this.acceleration.add(this.flowMem);
    this.acceleration.mult(2); 
  }

  this.display = function() {
    strokeWeight(this.r*0.4)
    stroke(255,191,0, 80)
    fill(180, 127, 0, 250);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r); //TEACHING: place random(#) for ellipse to show how draw works
    pop();
    noStroke();
  }

  this.drawShape = function(target) {
    stroke(0, 255, 0);
    strokeWeight(2);
    beginShape();
    vertex(this.position.x, this.position.y);
    vertex(this.lineto.x, this.lineto.y);
    endShape();
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }

}
