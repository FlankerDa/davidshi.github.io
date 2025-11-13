// Block Pusher Starter
// Your Name
// Date


let tiles = [];  //0 → grass  1 → chicken   2 → cow  3 → star
let level = [
  [0, 1, 0, 3, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0]
]

let playerX = 3; let playerY = 4;
let rows = level streng

function setup(){
  createCanvas(500,500);
  loadAssets
}
function draw(){
  background(200);
}

function renderBoard(){
  for(let x = 0; x< cols; x++){
    for(let y = 0; y< rows; y++){
      let imgIndex = level[y][x];
      let currentImage = tiles[imgIndex];
      image(currentImage, x*tiles_size, y * tiles_size);
    }

  }
}