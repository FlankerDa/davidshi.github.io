// Image Manipulation
//

let pilot; //p5.Image    .width  .height

function preload() {
  pilot = loadImage("assets/chip.jpg");
}

function setup() {
  createCanvas(pilot.width, pilot.height);
  pixelDensity(1);
}

function setPixelColor(pos, r, g, b) {
  //assume pos points at a RED component
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}

function draw() {
  image(pilot, 0, 0);
  loadPixels();  //fills pixels array
  background(0);

  drawCharacter();
  //updatePixels();
}

function drawCharacter(){
  //render an image using characters
  fill(255);

  for(let x = 0; x < width; x += 10){
    for(let y = 0; y < height; y += 10){
      let loc = (y*pilot.width + x) * 4;
      let avg = avgPixel(loc);  // 0 - 255
      if (avg > 200)       text("&",x,y);
      else if (avg > 150)  text("*",x,y);
      else if (avg > 100)  text("–",x,y);
      else if (avg > 50)   text(",",x,y);
      
    }
  }
}
