// 2D Array Basics
// David Shi
// NOv 6, 2025
// Working with 2D Arrays, Visualizations

let grid = [
  [0,  0,   255, 255, 0],
  [255, 255, 0,   255, 0],
  [0,   0,   0,   255, 0],
  [0,   0,   0,   255, 0],
  [0,   0,   0,   255, 0]
];

let squareSize = 225;
const NUM_ROWS = 5; 
const NUM_COLS = 5;
let showWin = false;
let overlayPattern = 'cross';   // overlay + flip pattern

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
  randomizeGrid();
}

function renderGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let fillColor = grid[y][x];
      fill(fillColor);
      stroke(0);
      strokeWeight(2);
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

  if(keyIsDown(SHIFT)) {
    flip(x, y);
  } else {
    if (overlayPattern === 'cross') {
      flip(x, y);
      if (y > 0) flip(x, y-1);
      if (x > 0) flip(x-1, y);
      if (x < NUM_COLS-1) flip(x+1, y);
      if (y < NUM_ROWS-1) flip(x, y+1);
    }
    else if (overlayPattern === 'square') {
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          let nx = x + i;
          let ny = y + j;
          if (nx >= 0 && nx < NUM_COLS && ny >= 0 && ny < NUM_ROWS) {
            flip(nx, ny);
          }
        }
      }
    }
  }

  showWin = checkWin();
}

function flip(x, y) {
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function randomizeGrid() {
  for(let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      grid[y][x] = random() > 0.5 ? 0 : 255;
    }
  }
}

function checkWin() {
  let firstValue = grid[0][0];
  for(let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (grid[y][x] !== firstValue) {
        return false;
      }
    }
  }
  return true;
}

function drawOverlay() { // draws the overlay on the player mouse
  let x = getCurrentX();
  let y = getCurrentY();

  fill(100, 100, 255, 150);
  noStroke();

  if (overlayPattern === 'cross') { // draw a cross shaped overlay on player mouse
    highlightSquare(x, y);
    highlightSquare(x-1, y);
    highlightSquare(x+1, y);
    highlightSquare(x, y-1);
    highlightSquare(x, y+1);
  }
  else if (overlayPattern === 'square') {  // draw a square shaped overlay on player mouse
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        highlightSquare(x + i, y + j);
      }
    }
  }
}

function highlightSquare(x, y) { // highlights the player overlay
  if (x >= 0 && x < NUM_COLS && y >= 0 && y < NUM_ROWS) {
    rect(x * squareSize, y * squareSize, squareSize, squareSize);
  }
}

function keyPressed() { // when pressed space, overlay change types, 1: cross, 2: square
  if (key === ' ') {
    if (overlayPattern === 'cross') overlayPattern = 'square';
    else overlayPattern = 'cross';
  }
}

function draw() {
  background(220);
  renderGrid();
  drawOverlay();

  if(showWin) {
    textSize(64);
    fill(0,255,0);
    textAlign(CENTER, CENTER);
    text("You Win", width / 2, height / 2);
  }
}

