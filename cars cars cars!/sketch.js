// Cars Cars Cars!
// David Shi
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myVehicle;
let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  myVehicle = new Vehicle(random(0, windowWidth), random(windowHeight / 4 + 270, windowHeight / 4 + 480), int(random(0, 2)), random(-1, -5)) * 10; 
  myVehicle1 = new Vehicle(random(0, windowWidth), random(windowHeight / 4, windowHeight / 4 + 200), int(random(0, 2)), random(1, 5)) * 10; 
}

function draw() {
  background(255, 255, 255);
  fill(56, 56, 56);
  drawRoad();

  myVehicle.display();
  myVehicle.move();

  myVehicle1.display();
  myVehicle1.move();
}

function drawRoad() {
  noStroke();
  rect(0, windowHeight/ 4, windowWidth, 500);
  for (let x = 0; x < windowWidth; x += 100) {
    fill(255, 255, 255);
    rect(x, windowHeight /2, 70,10);
  }
}

class Vehicle {
  constructor(x, y, type, speed) {
    this.x = x;  
    this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.type = type;
    this.xSpeed = speed;
  }

  move() {
    if (this.x < windowHeight / 4+ 270){
      this.x += this.xSpeed;
    }else{
      this.x += this.xSpeed;
    }

    if (this.x > windowWidth) {
      this.x = -50;
    }
  }

  speedUp() {
    if (this.xSpeed < 15) {
      this.xSpeed += 0.5;
    }
  }

  speedDown() {
    if (this.xSpeed > 0) {
      this.xSpeed -= 0.5;
    }
  }

  changeColor() {
    this.c = color(random(255),random(255),random(255));
  }

  display() {
    fill(this.c);
    if (this.type === 0) {
      this.drawCar();
    } else if (this.type=== 1) {
      this.drawTruck();
    }
  }

  drawCar() {
    rect(this.x, this.y, 50, 20);
    fill(0,0,0);
    rect(this.x+5, this.y-5, 10, 30);
    rect(this.x+35, this.y-5, 10, 30);
  }

  drawTruck() {
    rect(this.x, this.y, 120, 30);
    fill(255,255,255);
    rect(this.x-30, this.y+2.5, 30, 25);
  }
}
