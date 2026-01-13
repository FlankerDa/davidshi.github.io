// Final Coding Review
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];

let idleIndex = 0; let swipeOMdex = 0;
let gorillaState = 0;
let gorillaX = 200;

let spiralObjects = [];


async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
}

async function loadAssets(){
  for(let i=0; i <= 15; i++){
    if (i<10){
      spiralImages.push(loadImage("assets/Circle/circle0"+i+".png"))
    }
    else{
      spiralImages.push(loadImage("assets/Circle/circle"+i+".png"))
    }
  }
}

for(let i = 0; i<6; i++){
  gorillaIdle.push(loadImage("assets/Gorilla/idle"+i+".png"))
  gorillaSwipe.push(loadImage("assets/Gorilla/swipe"+i+".png"))
}

function draw() {
  background(220);
}

function drawGorilla(){
  if(gorillaState === 0)[
    image(gorillaIdle[idleIndex], gorillaX, height/2);

  ]
  else if(gorillaState === 1){
    
  }
}