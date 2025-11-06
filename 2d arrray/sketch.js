// 2D Array Basics
<<<<<<< HEAD
// David Shi
// NOv 6, 2025
// Working with 2D Arrays, Visualizations

=======
// Mr. Scott
// April 3, 2025
// Working with 2D Arrays, Visualizations
//0   255
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
let grid = [
  [0,  0,   255, 255, 0],
  [255, 255, 0,   255, 0],
  [0,   0,   0,   255, 0],
  [0,   0,   0,   255, 0]
<<<<<<< HEAD
];

let squareSize = 225;
=======
  ];

let squareSize = 60;
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
const NUM_ROWS = 4; const NUM_COLS = 5;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
}

function renderGrid() {
<<<<<<< HEAD
=======
  // interpret the information in the 2D array, and draw
  // a grid of colors on the screen to reflect it.
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

function getCurrentY() {
<<<<<<< HEAD
=======
  //determine current row of the mouse position
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
  let constrainedY = constrain(mouseY, 0, height - 1);
  return floor(constrainedY / squareSize);
}

function getCurrentX() {
<<<<<<< HEAD
=======
  //determine current col of the mouse position
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
  let constrainedX = constrain(mouseX, 0, width - 1);
  return floor(constrainedX / squareSize);
}

function mousePressed() {
<<<<<<< HEAD
  let x = getCurrentX();
  let y = getCurrentY();

  if (keyIsDown(SHIFT)) {
    flip(x, y);
  } else {
    flip(x, y);
    if (y > 0) flip(x, y-1);
    if (x > 0) flip(x-1, y);
    if (x < NUM_COLS-1) flip(x+1, y);
    if (y < NUM_ROWS-1) flip(x, y+1);
  }
}

function flip(x, y) {
=======
  //flip current tile to a random greyscale value
  //only do something if mouseX/mouseY are on the canvas...
  
  let x = getCurrentX();
  let y = getCurrentY();
  
  //always: flip the "current" tile
  flip(x,y);

  //sometimes: (depending on position) flip the neighbours
  if(y > 0) flip(x, y-1);  //NORTH 
  if(x > 0) flip(x-1, y);  //WEST
  if(x < NUM_COLS-1) flip(x+1, y); //EAST
  if(y < NUM_ROWS-1) flip(x, y+1); //SOUTH
  
}

function flip(x, y){
  //take a tile and invert its value
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

<<<<<<< HEAD
function draw() {
  background(220);
  renderGrid();
}
=======

function draw() {
  background(220);
  renderGrid();
}
>>>>>>> ae88ac7738a48021e9ca805719bcf4e09261bd63
