// Cars Cars Cars!
// David Shi
// 11/4/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eastbound = []; // defines spawn points of cars from east
let westbound = []; // defines spawn points of cars from west
let trafficLight; // defines traffic lights

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 20; i++) {
    let yEast = random(windowHeight / 4, windowHeight / 4 + 200); // spawning the cars from east
    eastbound.push(new Vehicle(random(windowWidth), yEast, int(random(0, 2)), random(1, 5)));// spawning the cars from east
    
    let yWest = random(windowHeight / 4 + 270, windowHeight / 4 + 480);// spawning the cars from west
    westbound.push(new Vehicle(random(windowWidth), yWest, int(random(0, 2)), random(-1, -5)));// spawning the cars from west
  }
  trafficLight = new TrafficLight(windowWidth/ 2, windowHeight / 4 - 60);// showing the traffic light
}

function draw() {
  background(255);
  fill(56);
  drawRoad(); // draws the road

  trafficLight.display(); // generate the lights
  trafficLight.update();// update the lights

  for (let v of eastbound) {  // make the east cars stop for 120 frames when light turns red
    if (trafficLight.isGreen()){
      v.action();
    }else{
      v.display()
    };
  }

  for (let v of westbound) { // make the west cars stop for 120 frames when light turns red
    if (trafficLight.isGreen()){
      v.action();
    }else{
      v.display();
    }
  }
}

function keyPressed() { //  when space was pressed, change the light to red
  if (key === ' ') {
    trafficLight.turnRed();
  }
}

function drawRoad() { // genrate the road
  noStroke();
  rect(0, windowHeight / 4, windowWidth, 500); //road
  for (let x = 0; x < windowWidth; x += 100) { //line 
    fill(255);
    rect(x, windowHeight / 2, 70, 10);
  }
}

class Vehicle { // draws the cars
  constructor(x, y, type, speed) {
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.type = type;
    this.xSpeed = speed;
  }

  move() { // make the movement random
    this.x += this.xSpeed;
    if (this.x > windowWidth + 50) this.x = -50;
    if (this.x < -50) this.x = windowWidth + 50;
  }

  display() { // generate cars or trucks
    fill(this.c);
    if (this.type === 0) this.drawCar();
    else this.drawTruck();
  }

  drawCar() { // the shape of the cars
    rect(this.x, this.y, 50, 20); // body fo the car
    fill(0);
    rect(this.x + 5, this.y - 5, 10, 30); // wheels
    rect(this.x + 35, this.y - 5, 10, 30); // wheels
  }

  drawTruck() { // the shape of the trucks
    rect(this.x, this.y, 120, 30);
    fill(255);
  }

  action() { // make the apper
    this.move();
    this.display(); 
  }
}

function mousePressed() {
  if (keyIsDown(SHIFT)) {
    let yWest = random(windowHeight / 4 + 270, windowHeight / 4 + 480); // adds cars when mouse and shift pressed
    westbound.push(new Vehicle(mouseX, yWest, int(random(0, 2)), random(-1, -5)));
  } else { 
    let yEast = random(windowHeight / 4, windowHeight / 4 + 200); // adds cars when mouse pressed
    eastbound.push(new Vehicle(mouseX, yEast, int(random(0, 2)), random(1, 5)));
  }
}

class TrafficLight { // traffic light
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = "green";
    this.timer = 0;
  }

  display() {

    fill(0);
    rect(this.x - 20, this.y - 60, 40, 100, 10); //  the traffic light

    if (this.state === "red") { // when the light is not red turns grey
      fill("red");
    } else {
      fill("gray");
    }
    circle(this.x, this.y - 25, 30); // draws the light

    if (this.state === "green") {// when the light is not green turns grey
      fill("green");
    } else {
      fill("gray");
    }
    circle(this.x, this.y + 25, 30); // draws the light
  }
  update() {
    if (this.state === "red") { // times the red light
      this.timer--;
      if (this.timer <= 0) {
        this.state = "green";
      }
    }
  }

  turnRed() { // set the time of red light
    this.state = "red";
    this.timer = 120;
  }

  isGreen() { // update the status
    return this.state === "green";
  }
}