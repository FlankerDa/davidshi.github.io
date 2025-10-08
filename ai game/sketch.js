let terrain = [];
let balls = [];
let gravity;
let terrainResolution = 1;
let mode = 'terrain';
let waterLevel;
let waterActive = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.5);
  waterLevel = height * 0.75;

  for (let x = 0; x < width; x += terrainResolution) {
    terrain[x] = height - 100;
  }
}

function draw() {
  background(220);

  // Draw water
  if (waterActive) {
    fill(50, 100, 200, 150);
    noStroke();
    rect(0, waterLevel, width, height - waterLevel);
  }

  // Draw terrain
  stroke(0);
  fill(100, 200, 100);
  beginShape();
  vertex(0, height);
  for (let x = 0; x < width; x += terrainResolution) {
    if (terrain[x] === undefined) terrain[x] = height - 100;
    vertex(x, terrain[x]);
  }
  vertex(width, height);
  endShape(CLOSE);

  // Instructions
  fill(0);
  noStroke();
  textSize(16);
  text("Mode: " + mode + " | Press 'T' for Terrain, 'B' for Balls, 'W' to toggle water", 10, 20);

  // Update balls
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    b.applyForce(gravity);
    if (waterActive) b.applyWaterPhysics();
    b.update();
    b.checkCollision(terrain);
    b.checkBallCollision(balls);
    b.show();

    if (b.pos.y > height + 50) balls.splice(i, 1);
  }
}

function mouseDragged() {
  if (mode === 'terrain') {
    let radius = 20;
    for (let dx = -radius; dx <= radius; dx++) {
      let x = mouseX + dx;
      if (x >= 0 && x < terrain.length) {
        let dist = abs(dx);
        let influence = map(dist, 0, radius, 1, 0);
        terrain[x] = lerp(terrain[x], mouseY, influence);
      }
    }
  }
}

function mousePressed() {
  if (mode === 'balls') balls.push(new Ball(mouseX, mouseY, 15));
}

function keyPressed() {
  if (key === 'T' || key === 't') mode = 'terrain';
  if (key === 'B' || key === 'b') mode = 'balls';
  if (key === 'W' || key === 'w') waterActive = !waterActive;
}

function windowResized() {
  let oldWidth = width;
  let oldTerrain = terrain.slice();
  resizeCanvas(windowWidth, windowHeight);
  waterLevel = height * 0.75;

  let newTerrain = [];
  for (let x = 0; x < width; x += terrainResolution) {
    if (x < oldWidth) newTerrain[x] = oldTerrain[x];
    else newTerrain[x] = height - 100;
  }
  terrain = newTerrain;
}

// Ball class with rolling on slopes
class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  applyWaterPhysics() {
    if (this.pos.y + this.r > waterLevel) {
      let submerged = constrain((this.pos.y + this.r - waterLevel) / (2 * this.r), 0, 1);
      let buoyancy = createVector(0, -gravity.y * submerged * 1.5);
      let drag = this.vel.copy().mult(-0.2 * submerged);
      this.applyForce(buoyancy);
      this.applyForce(drag);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  checkCollision(terrain) {
    let left = constrain(floor(this.pos.x - this.r), 0, terrain.length - 2);
    let right = constrain(floor(this.pos.x + this.r), 0, terrain.length - 2);

    // Find the lowest terrain point under ball
    let minY = this.pos.y + this.r;
    let slopeX = left;
    for (let x = left; x <= right; x++) {
        if (terrain[x] < minY) {
            minY = terrain[x];
            slopeX = x;
        }
    }

    if (this.pos.y + this.r > minY) {
        this.pos.y = minY - this.r;

        // Calculate slope vector
        let dx = 1;
        let dy = terrain[slopeX + 1] - terrain[slopeX];
        let slope = createVector(dx, dy).normalize();

        // Project gravity along the slope (downhill only)
        let gravityAlongSlope = createVector(gravity.x, gravity.y).dot(slope);
        this.vel.add(slope.copy().mult(gravityAlongSlope * 2)); // tweak multiplier for speed

        // Friction
        this.vel.mult(0.95);
    }
}


  checkBallCollision(balls) {
    for (let other of balls) {
      if (other === this) continue;
      let dir = p5.Vector.sub(this.pos, other.pos);
      let dist = dir.mag();
      let minDist = this.r + other.r;
      if (dist < minDist && dist !== 0) {
        let overlap = minDist - dist;
        dir.normalize();
        this.pos.add(dir.copy().mult(overlap / 2));
        other.pos.sub(dir.copy().mult(overlap / 2));
        let v1 = this.vel.copy();
        let v2 = other.vel.copy();
        this.vel = v1.copy().sub(dir.copy().mult(dir.dot(v1.sub(v2))));
        other.vel = v2.copy().sub(dir.copy().mult(dir.dot(v2.sub(v1))));
      }
    }
  }

  show() {
    fill(200, 50, 50);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
