// The Balloon Tree
// David Shi
// 2025/11/26
//
// Generates an tree with balloons


let scale = 40;
let leafdepth = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  background(255);
  drawTree(width/2, height*0.9, 90, 6);
  randomSeed(20); // seed for fixed random colors and sizes
}

function drawLine( x1, y1, x2, y2, depth, thickness) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  strokeWeight(thickness);
  line(x1, y1, x2, y2);
}

function drawLeaf(x, y, z){ // draws the ballon
  r = random(255);
  g = random(255);
  b = random(255);

  fill(r, g, b);
  circle(x, y, z*2);

}

function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    let x2 = x1 + cos(radians(angle))*depth*scale; //calculate endpoints of current branch
    let y2 = y1 - sin(radians(angle))*depth*scale; //using trig ratios. Get shorter based on depth
    drawLine(x1, y1, x2, y2, depth, depth*1.5);
    //for a ３-branch tree:
    let offset = map(mouseX, 0, width, 5, 15);
    drawTree(x2, y2, angle-offset, depth-1); // move based on mouse x
    drawTree(x2, y2, angle+offset, depth-1); // move based on mouse x
    drawTree(x2, y2, angle+0, depth-1);


    if (depth < leafdepth){
      drawLeaf(x2, y2, random(5, depth*3)); // draw ballons based on depth
    }

    
  }
}

function keyPressed() {
  if (key === 'x') {
    leafdepth = min(6, leafdepth +1); // press x change the depth up
  }
  else if (key === 'z') {
    leafdepth = max(1, leafdepth - 1); // press z change the depth down
  }
}

