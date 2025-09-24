// Working with Images
// David Shi
// 9/24/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x1, y1, x2, y2;
let d1, d2;
let noiseTime, noiseSpeed;

let minSize = 5; let maxSize = 200;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width*0.3; y1 = height*0.5;
  x2 = width*0.7; y2 = width*0.5;
  frameRate(10);
}

function draw() {
  background(220);
  randomCircle();
  noiseCircle();
}

function noiseCircle(){
  d2 = noise(noiseTime);
  d2 = map(d2, 0, 1, minSize, maxSize);
  fill(255, 50, 150);
  circle(x2,y2,d2);
  noiseTime = noiseSpeed;
}

function randomCircle(){
  fill(50, 150, 250);
  d1 = random(5, 200);
  circle(x1, y1, d1);
}