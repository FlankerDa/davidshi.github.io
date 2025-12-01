// Vector Visualization
// Mr. Scott
// May 5, 2025

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  objects.push(new Ball(width*0.1, height*0.5));
}

function draw() {
  background(220);

  if(mouseIsPressed){
    objects.push(new Ball(mouseX, mouseY));
  }

  for (let o of objects){
    //if(keyIsPressed && key === " "){
      o.move();
    //}
    //o.calcMouse();
    o.display();
  }

}

class Ball{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5,5),-5);
    this.grav = createVector(0,0.2);
    //this.grav; //MOUSE ATTRACTOR
  }

  calcMouse(){
    //mouse vector calculations
    this.grav = createVector(mouseX, mouseY);
    this.grav.sub(this.pos);
    this.grav.normalize(); //sets between 0-1
    this.grav.mult(4);
  }

  move(){
    //update velocity and position vectors
    this.vel.add(this.grav);
    this.vel.limit(30);  //can't go outside -10 and 10
    this.pos.add(this.vel);

    //wall-floor bounce
    if(this.pos.x < 0 || this.pos.x > width){
      this.vel.x *= -1;
    }
    if(this.pos.y > height){
      this.vel.y *= -1;
    }
  }
  
  display(){
    //display Ball
    circle(this.pos.x, this.pos.y, 20);

    //display vectors
    stroke(255,0,0);
    line(0,0,this.pos.x, this.pos.y);

    stroke(0,0,255);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);

    let endVX = this.pos.x + this.vel.x;
    let endVY = this.pos.y + this.vel.y;
    stroke(0,255,0);
    line(endVX, endVY, endVX + this.grav.x, endVY + this.grav.y);

  }

}