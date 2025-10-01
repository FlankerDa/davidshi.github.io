// Terrain Generation Starter
// Mr. Scott
// 9/29/2025
// Procedurally Generated 2D Terrain

let rectWidth = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

}
function draw() {
  background(225);
  rectMode(CENTER);  //CHANGE THIS!!!!
  drawRectangles();
}

function drawRectangles(){
  //using a single loop, generate a bunch of side-to-side
  //rectangles of varying height (pattern, random, noise)
  let rectHeight;
  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    //option 1 - pattern
    let rectHeight = x;

    //option 2 - random()
    rectHeight = random(50, 500);

    //perlin noise.. on your own.
    rect(x, height/2, rectWidth, rectHeight);

  }
}

