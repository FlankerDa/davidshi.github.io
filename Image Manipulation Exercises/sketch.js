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






// Majority color
function drawCharacter(){
  //render an image using characters
  fill(255);


  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let loc = (y * pilot.width + x) * 4;
      let r = pixels[loc];
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];
      if (r >= g && r >= b) {
        setPixelColor(loc, 255, 0, 0); // Red
      } else if (g >= r && g >= b) {
        setPixelColor(loc, 0, 255, 0); // Green
      } else {
        setPixelColor(loc, 0, 0, 255); // Blue
      }
    }
  }
  updatePixels();
}




// No Green Right Side
// function draw() {
//   image(pilot, 0, 0);
//   loadPixels();
//   background(0);

//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       let loc = (y * pilot.width + x) * 4;
//       let r = pixels[loc];
//       let g = pixels[loc + 1];
//       let b = pixels[loc + 2];

//       if (x > width/2) {
//         setPixelColor(loc, r, 0, b);
//       } else {
//         setPixelColor(loc, r, g, b);
//       }
//     }
//   }
//   updatePixels();
// }







