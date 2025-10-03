// Terrain Generation Starter
// Mr. Scott
// 9/29/2025
// Procedurally Generated 2D Terrain

let rectHeight;
let rectWidth = 1;
let noiseStart = 0;
let noiseSmooth = 0.02;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

}

function draw() {
  background(225);
  rectMode(CENTER);
  generateTerrain();
}

function generateTerrain(){
  let peakY = 0;
  let peakX = 0;
  fill(225);
  for(let x = 0; x < width; x += rectWidth){
    let noiseValue = noise(noiseStart + x *noiseSmooth);
    rectHeight = noiseValue * windowHeight;

    if (rectHeight > peakY){
      peakY = rectHeight;
      peakX = x;
    }
    rect(x, windowHeight, rectWidth, windowHeight - rectHeight);
    
  }
  noiseStart = noiseStart +0.05;
  drawFlag(peakX, peakY);

}

function drawFlag(x, y){
  fill(225, 0, 0);
  rect(x, y, 10, 30);
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rectWidth = max(1, rectWidth - 1);
  }else if(keyCode === RIGHT_ARROW){
    rectWidth++;
  }
}

