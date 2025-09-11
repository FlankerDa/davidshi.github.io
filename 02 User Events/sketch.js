// Coordinates Systems and User Events
// David Shi
// September 10, 2025
//A first look at interactive programs -


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  challenge();
}

function challenge(){
  circle(width/2, height/2, 50);
  circle(width, height, 50);
  circle(width-width, height-height, 50);
  circle(width-width, height, 50);
  circle(width, height-height, 50);
}
