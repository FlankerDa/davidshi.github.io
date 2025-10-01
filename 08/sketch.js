// Noisy Numbers with Object and Noise
// Mr. Scott / David Shi style
// March 7, 2024

let segmentLength = 3;
let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize ball object
  ball = {
    x: width * 0.7,
    y: height / 2,
    size: 30,
    color: color(random(255), random(255), random(255)),
    timeX: random(100),
    timeY: random(100),
    timeStep: 0.03
  };
}

function draw() {
  background(220);
  segmentLine();
  moveBall(ball);
}

function segmentLine() {
  strokeWeight(15);
  let greyTime = 0;
  let x = 0;
  
  while (x < width) {
    let greyValue = noise(greyTime);  // Perlin noise from 0 to 1
    greyValue = map(greyValue, 0, 1, 0, 255);
    stroke(greyValue);
    line(x, height / 2, x + segmentLength, height / 2);
    greyTime += 0.1;
    x += segmentLength;
  }
}

function moveBall(b) {
  // Use noise for smooth movement in both x and y directions
  let dx = noise(b.timeX);
  dx = map(dx, 0, 1, -10, 10);
  
  let dy = noise(b.timeY);
  dy = map(dy, 0, 1, -10, 10);
  
  b.x += dx;
  b.y += dy;
  
  // Increment noise time variables
  b.timeX += b.timeStep;
  b.timeY += b.timeStep;
  
  // Keep ball inside the canvas
  b.x = constrain(b.x, b.size / 2, width - b.size / 2);
  b.y = constrain(b.y, b.size / 2, height - b.size / 2);
  
  fill(b.color);
  noStroke();
  circle(b.x, b.y, b.size);
}
