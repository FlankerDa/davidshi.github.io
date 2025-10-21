// Connected Nodes
// Mr. Scott
// March 18, 2025
// OOP Review + Object-Object Interactions

//Global Variables
let nodes = [];  //to hold all our objects
let reach = 150;  //how far connections b/w points may be

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // if(mouseIsPressed)nodes.push(new csNode(mouseX, mouseY));

  for (let n of nodes){
    //looping by item is good here, as we don't
    //plan on deleting any objects from the array
    n.move();
    n.connect(nodes);
    n.display();
  }
}

function mousePressed(){
  //create one node per mousepress
  nodes.push(new csNode(mouseX, mouseY));
}


class csNode{
  //1. constructor
  constructor(x,y){ //called once per object created
    //properties related to position/rendering
    this.x = x;    this.y = y;   this.size = 20;
    this.c = color(random(255),random(255),random(255));

    //properties related to motion
    this.xTime = random(10);   this.yTime = random(10);
    this.timeShift = 0.01;  this.maxSpeed = 5;
  }

  //2. class methods
  display(){
    fill(this.c);
    noStroke();

    circle(this.x, this.y, this.size);

  }

  connect(nodeArray){
    //check if the current point is close to any
    //other points, and if so join with a line
    stroke(this.c);
    for(let n of nodes){
      //this.x this.y    n.x  n.y 
      if(n !== this){ //make sure not to compare to self
        let d = dist(this.x, this.y, n.x, n.y);
        if(d < reach){ //the two points are close...
          line(this.x, this.y, n.x, n.y);
        }
      }
    }
  }

  move(){
    //use perlin noise for x/y movement
    let xSpeed = noise(this.xTime); //0  -   0.5    -  1
    xSpeed = map(xSpeed, 0, 1, -this.maxSpeed, this.maxSpeed)
    this.xTime += this.timeShift;

    this.x += xSpeed;
    if(this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;

    let ySpeed = noise(this.yTime);
    ySpeed = map(ySpeed,0,1,-this.maxSpeed,this.maxSpeed);
    this.yTime += this.timeShift;

    this.y += ySpeed;
    if(this.y < 0) this.y = height;
    else if(this.y > height) this.y = 0;
  
  }

}