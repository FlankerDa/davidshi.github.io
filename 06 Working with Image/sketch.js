// Working with Images
// David Shi
// 9/24/2025

let lionL, lipnR;

function setup() {
  createCanvas(windowWidth, windowHeight)
  loadAssets();
  imageMode(CENTER);
  noCursor();
}

async function loadAssets(){
    lionL = await loadAssets("assets/lion-left.png");
    lionR = await loadAssets("assets/lion-right.png");
}

function draw() {
  background(220);
  image(lionL, mouseX, mouseY)
}
