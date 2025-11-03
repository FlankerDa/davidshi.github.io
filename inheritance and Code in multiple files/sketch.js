// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let objects = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i =0; i < 20; i++){
    objects.push(new AnimatedObject(random(width), random(height)));
    objects.push(new CircleObject(random(width), random(height)));
    objects.push(new LineObject());
  }
}

function draw() {
  background(220);
  for(let o of objects){
    o.move();
    o.display();
  }
}


class AnimatedObject{
  constructor(x,y){
    this.x = x; this.y = y;
    this.size = 6;
  }

  move(){
    this.x += random(-2,2);
    this.y +=  random(-2.2);

  }

  display(){
    strokeWeight(this.size);
    point(this.x, this.y, this.size);
  }
}

class CircleObject extends AnimatedObject{
  constructor(x,y){
    super(x,y);
    this.size = random(20,40);

  }

  display(){
    if(dist(this.x, this.y, mouseX, mouseY)){
      fill(0,255,0);
    }
    else fill(255);
      circle(this.x, this.y, this.size);
  }
  
}


class LineObject extends AnimatedObject{
  constructor(){
    super(random(width), random(height));

  }
  move(){
    super.move();
    this.x -= 5;
    if(this.x < 0) this.x = width;
  }

  display(){
    if(mouseIsPressed){
      strokeWeight(12);
    }else
      strokeWeight(2);
    line(this.x, this.y, this.x+15, this.y);
  }
}