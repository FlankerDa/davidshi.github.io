// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let NUM_CIRCLES = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircles();
}

function drawCircles(){
  noFill();
  let smallestDiamter = Infinity;
  let smallestX;
  let smallestY;

  for (let i = 0; 1< NUM_CIRCLES; i++){
    let x = random(0, width);
    let y = random(0, height);
    let d = random(20, 100);
    if(d < smallestDiamter){
      smallestDiamter = d;
      smallestX = x;
      smallestY = y;
    }

    circle(x,y,0);
  }
  fill(225);
  circle(smallestX, smallestY, smallestDiamter);
}