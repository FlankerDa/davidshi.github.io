// Local Storage Demo
// Mr. Scott
// OCt 24, 2025


let mySquare;
let totalBounces = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  mySquare = new Bouncer(width/2, height/2);
}

function draw() {
  background(220);
  mySquare.move();
  mySquare.display();

}



class Bouncer{
  constructor(x, y){
    this.x = x;   this.y = y;
    this.xSpeed = random(-5,5);
    this.ySpeed = random(-5,5);
  }

  //class methods
  display(){
    square(this.x, this.y, 30);
  }

  move(){
    //calculate new position
    this.x += this.xSpeed;   this.y += this.ySpeed;

    //should we bounce?  x first
    if(this.x < 0 || this.x > width){
      this.xSpeed *= -1;
      totalBounces++;
    }

    if(this.y < 0 || this.y > height){
      this.ySpeed *= -1;
      totalBounces++;
    }
  }

}