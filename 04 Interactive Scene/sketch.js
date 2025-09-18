// Interactive Scene
// David Shi
// 9/16/2025
// create an interactive scene, where the displayed contents of the window will depend on user input.


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(100);
  building0();

  mouseClicked();
  sky()

}

function building0() {
  fill(225);
  rect(0, 650 , 2000, 35);
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
  rect(0, 825, 2000, 100);
  quad(740, 825, 1150, 825, 980, 650, 875, 650);
}

function sky(){
  circle(925, 425, 100)
}


function mouseClicked() {
  let textX = ("X: " + mouseX);
  let textY = ("Y: " + mouseY);

  fill(225, 0, 0);
  text(textX, mouseX, mouseY-5);
  text(textY, mouseX+45, mouseY-5)



}