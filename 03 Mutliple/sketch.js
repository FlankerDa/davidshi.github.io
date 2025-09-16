// Project Title
// David
// 9/15/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  checkMulti();
}

function checkMulti(){
  strokeWeight(mouseX / 10);
  stroke(225, 0, 0);
  let a = keyIsDown(65);
  let b = keyIsDown(66);
  let c = keyIsDown(67);
  textSize(40);
  text("a:" + a + "\tb:" + b + "\tc:" + c, 100, 300)
}
