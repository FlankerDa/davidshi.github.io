let pilot;

function preload() {
  pilot = loadImage("assets/chip.jpg");
}

function setup() {
  createCanvas(pilot.width, pilot.height);
  pixelDensity(1);
}

function setPixelColor(pos, r, g, b) {
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}

function draw() {
  image(pilot, 0, 0);
  loadPixels();
  background(0);

  majorityColor();
}

function majorityColor() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let loc = (y * pilot.width + x) * 4;
      let r = pixels[loc];
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];
      if (r >= g && r >= b) setPixelColor(loc, 255, 0, 0);
      else if (g >= r && g >= b) setPixelColor(loc, 0, 255, 0);
      else setPixelColor(loc, 0, 0, 255);
    }
  }
  updatePixels();
}
