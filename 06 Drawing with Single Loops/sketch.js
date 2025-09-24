// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  gradientBackground()
  circleLine(height *0.35, 30);
  circleLine(height /2, 50);
  circleLine(height *0.65, 80);

}

function cDistance(x1, y1, x2, y2){
  // calulate the straightine distance
  let a = abs(x1-x2);
  let b = abs(y1-y2);
  let c = sqrt(pow(a, 2) + pow(b,2)); //sqaure root, power ^
  return c.toFixed(1); // 1 decimal place
}

function circleLine(y, size){
  // y the height at which to draw the line
  let xStart = width * 0.1 ; //pos from the left
  let xEnd = width * 0.9; //90% horizontal pos from left\



  for(let x = xStart ; x <= xEnd ; x+= size){
    
    let d = cDistance(x, y, mouseX, mouseY);
    if ( d <= size/2){
      fill(200, 200, 0);
    }
    else fill (255);
    circle(x, y, size);
    textAlign(CENTER, CENTER);
    text(d, x, y);
  }

}

function gradientBackground(){
  let h = 25;
  let y = 0;                
  while (y <= height){
    let mappedY = map(y,0,height,0,255);
    fill(mappedY, mappedY, 0);
    rect(0, y, width, h);
    y += h;
  }
}

