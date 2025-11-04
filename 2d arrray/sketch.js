// 2D Array Basics
// Mr. Scott
// April 3, 2025
// Working with 2D Arrays, Visualizations
//0   255
let grid = [
  [0,  0,   255, 255, 0],
  [255, 255, 0,   255, 0],
  [0,   0,   0,   255, 0],
  [0,   0,   0,   255, 0]
  ];

let squareSize = 60;
const NUM_ROWS = 4; const NUM_COLS = 5;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
}

function renderGrid() {
  // interpret the information in the 2D array, and draw
  // a grid of colors on the screen to reflect it.
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

function getCurrentY() {
  //determine current row of the mouse position
  let constrainedY = constrain(mouseY, 0, height - 1);
  return floor(constrainedY / squareSize);
}

function getCurrentX() {
  //determine current col of the mouse position
  let constrainedX = constrain(mouseX, 0, width - 1);
  return floor(constrainedX / squareSize);
}

function mousePressed() {
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
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}


function draw() {
  background(220);
  renderGrid();
}