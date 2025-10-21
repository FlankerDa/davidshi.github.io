// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  myBall = new Ball(100,100);
}

function draw() {
  background(220);
  myBall.move();
  myBall.display();
}

class Ball{
  constructor(x,y){
    this.x = x; this.y = y
    this.c = color(random(255), random(255), random(255));
    this.size = 15;
  }
  display(){
    fill(this.c);
    circle(this.x, this.y, this.size);
  }
  
  move(){
    this.x += this.speed;
    if(this.x > width) this.x = 0;
  }
}

if(mouseIsPressed){
  ballCollection.push
}
