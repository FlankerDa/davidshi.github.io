// Cars Cars Cars!
// David Shi
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  myVehicle = new Vehicle(width/2, height/2);
}

function draw() {
  fill(56,56,56);
  drawRoad();
  myVehicle.display();
}

function drawRoad() {
  noStroke();

  rect(0, windowHeight/4, windowWidth, 500);
  for (let x = 0; x < windowWidth; x += 100){

    fill(255,255,255);
    rect(x, windowHeight/2, 70, 10);
    
  }
}

class Vehicle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.type = type;
  }

  display(){
    this.type = str(random(0,1));
    fill(random(0,255),random(0,255),random(0,255),);

    if(type == 0){
      rect(this.x, this.y, 10, 5);
    }else{
      rect(this.x,this.y, 20, 5);
    }
  }


  move(){

  }
}

