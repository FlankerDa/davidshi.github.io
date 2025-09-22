// Interactive Scene
// David Shi
// 9/16/2025
// create an interactive scene, where the displayed contents of the window will depend on user input.

let currentBack = 0
let backR = 123;
let backG = 156;
let backB = 225;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(backR, backG, backB);
  eniv();
  building0();
  mouseClicked();

  character();

}

function building0() {
  fill(96, 96, 96);
  rect(0, 650 , 2000, 35);
  fill(192, 192, 192);
  //first building
  quad(0, 100, 0, 800, 385, 800, 385, 100);
  quad(385, 100, 385, 800, 530, 710, 530, 230);
  //second building
  quad(710, 330, 710, 720, 650, 800, 650, 250);
  quad(650, 800, 650, 250, 400, 250, 400, 800);
  //third building
  quad(1150, 330, 1150, 720, 1250, 800, 1250, 250);
  quad(1250, 800, 1250, 250, 1500, 250, 1500, 800);
  //fourth building
  quad(1600, 330, 1600, 800, 2000, 800, 2000, 330);
  quad(1600, 800, 1600, 330, 1500, 400, 1500, 750);
  //Road
  fill(96, 96, 96);
  rect(0, 825, 2000, 100);
  quad(740, 825, 1150, 825, 980, 650, 875, 650);
  //signture
  fill(0);
  textSize(24);
  text("David Shi", 15, height * 9 / 10);
}

function eniv(){
  fill(255, 153, 51); //Sun
  circle(925, 425, 200);
  fill(0, 204, 102); // ground
  rect(0, 615, 2000, 2000);
}

function character(){
  stroke(0, 0, 0);
  strokeWeight(3);
  square(mouseX, mouseY, 100);
  circle(mouseX + 25, mouseY + 25, 25);
  circle(mouseX + 75, mouseY + 25, 25);
}

function mouseClicked() {
  let textX = ("X: " + mouseX);
  let textY = ("Y: " + mouseY);

  fill(225, 0, 0);
  text(textX, mouseX, mouseY-5);
  text(textY, mouseX+45, mouseY-5)

  text(22, textY, textX);
  fill(233);
}


function mousePressed() {
  if (mouseButton === CENTER) {
    if (currentBack === 0) {
      backR = 255
      backG = 0
      backB = 0
      currentBack = 1
    } else if (currentBack === 1) {
      backR = 123
      backG = 123
      backB = 255
      currentBack = 2
    } else if (currentBack === 2) {
      backR = 255
      backG = 75
      backB = 225
      currentBack = 3
    } else if (currentBack === 3) {
      backR = 255
      backG = 100
      backB = 50
      currentBack = 0
    }
  }
}