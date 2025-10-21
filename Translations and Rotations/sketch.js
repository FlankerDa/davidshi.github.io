// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let sec = second();

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  clock();
}

function clock(){
  noFill();
  translate(width/2, height/2);
  circle(0,0, 500);
  for(let i = 0; i < 12; i++){
    fill(225,0,0);
    push();
    rotate(i * 30);
    rect(210, 0, 30, 3);
    pop();
  }

  for(let i = 0; i < 60; i++){
    fill(225,0,0);
    push();
    rotate(i * 6);
    rect(210, 0, 15, 3);
    pop();
  }

  rect(0, 0, 200, 3);



}
