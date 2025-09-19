// Interactive Scene
// David Shi
// 9/16/2025
// create an interactive scene, where the displayed contents of the window will depend on user input.

let backR = 0;
let backG = 0;
let backB = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(backR, backG, backB);
  eniv();
  building0();

  mouseClicked();
  mousePressed();

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
}

function eniv(){
  fill(255, 153, 51); //Sun
  circle(925, 425, 200);
  fill(0, 204, 102); // ground
  rect(0, 615, 2000, 2000);
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
  if (mouseButton == CENTER) {
    // Increase the red value if it's less than 153
    if (backR < 153) {
      backR = backR + 5;
    }
    // If red is 153, increase the green value if it's less than 204
    else if (backR >= 153 && backG < 204) {
      backG = backG + 5;
    }
    // If green is 204, increase the blue value if it's less than 255
    else if (backG >= 204 && backB < 255) {
      backB = backB + 5;
    }
  }

  // Ensure values stay within RGB bounds
  backR = constrain(backR, 0, 255);
  backG = constrain(backG, 0, 255);
  backB = constrain(backB, 0, 255);
}