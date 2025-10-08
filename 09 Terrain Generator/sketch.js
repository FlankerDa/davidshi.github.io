// Perlin Noise
// David Shi
// 9/29/2025
// Procedurally Generated 2D Terrain

let rectHeight; // rectangle height
let rectWidth = 1; // recangle width
let noiseStart = 0; // the genereate starts
let noiseSmooth = 0.02; // the smoothness of the rectangles


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (keyIsDown(LEFT_ARROW)){ // Left arrow pressed decrease with
    rectWidth = max(1, rectWidth - 1);
  } else if (keyIsDown(RIGHT_ARROW)){ // Right arrow pressed increase with
    rectWidth++;
  }
  background(225);
  rectMode(CORNER);
  generateTerrain(); // generate terrian
}

function generateTerrain(){
  let peakY = height; // founnd the highest point
  let peakX = 0; // found the x of the highest point
  let totalHeight = 0; // the total rectangle
  let count = 0; // the total rectangle

  fill(225);
  for(let x = 0; x < width; x += rectWidth){
    let noiseValue = noise(noiseStart + x *noiseSmooth);
    let rectHeight = noiseValue * windowHeight;
    let y = height - rectHeight;
    fill(225,0,0);
    rect(x, y, rectWidth, rectHeight);
    totalHeight += rectHeight; // average height
    count++; // add rectangle in the value


    if (y < peakY){ // update the peak
      peakY = y;
      peakX = x;
    }

    
  }

  let aHeight = totalHeight / count; // calulate the average of height
  fill(225,0,0);
  rect(0, height - aHeight, width, 5); // average line
  noiseStart = noiseStart +0.2;
  drawFlag(peakX, peakY); // draw flag

}

function drawFlag(x, y){ // draws the flag
  fill(225, 0, 0);
  line(x, y, x, y - 30);

  triangle(x,y - 30, x +15, y-25, x, y-20);
}

