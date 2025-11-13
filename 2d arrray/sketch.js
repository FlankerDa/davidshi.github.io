// 2D Array Basics
// David Shi
// NOv 6, 2025
// Working with 2D Arrays, Visualizations

let grid = [
  [0,  0,   255, 255, 0],
  [255, 255, 0,   255, 0],
  [0,   0,   0,   255, 0],
  [0,   0,   0,   255, 0]
];

let squareSize = 225;
const NUM_ROWS = 4; const NUM_COLS = 5;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
  randomizeGrid();
}

function renderGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

function getCurrentY() {
  let constrainedY = constrain(mouseY, 0, height - 1);
  return floor(constrainedY / squareSize);
}

function getCurrentX() {
  let constrainedX = constrain(mouseX, 0, width - 1);
  return floor(constrainedX / squareSize);
}

function mousePressed() {
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

  if (checkWin()) {
    print("You Win");
  }
}

function flip(x, y) {
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function randomizeGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      grid[y][x] = random() > 0.5 ? 0 : 255;
    }
  }
}

function checkWin() {
  let firstValue = grid[0][0];
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (grid[y][x] !== firstValue) {
        return false;
      }
    }
  }
  return true;
}

function draw() {
  background(220);
  renderGrid();
}
