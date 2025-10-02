// Terrain Generation Starter
// Mr. Scott
// 9/29/2025
// Procedurally Generated 2D Terrain

let rectHeight;
let rectWidth = 5;
let noiseStart = 0;
let noiseSmooth = 0.02;
let peakY = 0;
let peakX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

}

function draw() {
  frameRate(30);
  background(225);
  rectMode(CENTER);
  generateTerrain();
}

function generateTerrain(){
  let peakY = 0;
  let peakX = 0;
  for(let x = 0; x < width; x += rectWidth){
    let noiseValue = noise(noiseStart + x *noiseSmooth);
    rectHeight = noiseValue * windowHeight;
    if (rectHeight > peak){
      let peakY = rectHeight;
      let peakX = x
    }
    rect(x, windowHeight - rectHeight, rectWidth, rectHeight);
    
  }
  noiseStart += 0.01;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rectWidth = max(1, rectWidth - 1);
  }else if(keyCode === RIGHT_ARROW){
    rectWidth++;
  }
}

