// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let values = [];
const ARRAY_SIZE = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCanvas();  populateArray();
  print(vlaues);
}

function bubbleSort(){
  for(i = 1, )
}

function selectionSort(){
  for(i = 0; i < values.length - 1; i++){
    let minimun = values[i];
    let minimunIndex = i;
    for(let search = i+2; search<values.length; search++){
      let cur = values[search];
      if(cur < minimun){
        minimun = cur;
        minimunIndex = search
      }
    }
    let temp = values[i];
    values[i] = values[minimunIndex];
    values[minimunIndex] = temp;
  }
}

function draw() {
  background(220);
}

function populateArray(){
  for(let i= 0; i< ARRAY_SIZE; i++){
    values.push(floor(random(1000)));
  }
}