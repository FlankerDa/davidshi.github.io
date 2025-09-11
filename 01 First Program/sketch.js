// Coordinates Systems and User Events
// David Shi
// September 10, 2025
//A first look at interactive programs -


function setup() {
  createCanvas(windowWidth, windowHeight);
  print(windowWidth, windowHeight, width, height);
}

function draw() {
  background(200);
  drawTwoCircles();
}

function drawTwoCircles(){
  
  fill(0, 225, 0);
  circle(mouseX, mouseY, 30);
  circle(width/2, height/2, 100);
}