// Cars Cars Cars!
// David Shi
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 20; i++) {
    let yEast = random(windowHeight / 4, windowHeight / 4 + 200);
    eastbound.push(new Vehicle(random(windowWidth), yEast, int(random(0, 2)), random(1, 5)));
    
    let yWest = random(windowHeight / 4 + 270, windowHeight / 4 + 480);
    westbound.push(new Vehicle(random(windowWidth), yWest, int(random(0, 2)), random(-1, -5)));
  }
}

function draw() {
  background(255);
  fill(56);
  drawRoad();

  for (let v of eastbound) {
    v.action();
  }

  for (let v of westbound) {
    v.action();
  }
}

function keyPressed(){
  if(keyCode === "SPACE"){

  }
}

function drawRoad() {
  noStroke();
  rect(0, windowHeight / 4, windowWidth, 500);
  for (let x = 0; x < windowWidth; x += 100) {
    fill(255);
    rect(x, windowHeight / 2, 70, 10);
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
    this.x += this.xSpeed;
    if (this.x > windowWidth + 50) this.x = -50;
    if (this.x < -50) this.x = windowWidth + 50;
  }

  display() {
    fill(this.c);
    if (this.type === 0) this.drawCar();
    else this.drawTruck();
  }

  drawCar() {
    rect(this.x, this.y, 50, 20);
    fill(0);
    rect(this.x + 5, this.y - 5, 10, 30);
    rect(this.x + 35, this.y - 5, 10, 30); 
  }

  drawTruck() {
    rect(this.x, this.y, 120, 30);
    fill(255);
  }

  action() {
    this.move();
    this.display(); 
  }
}
