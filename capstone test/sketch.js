// Capstone [Name: WHY ARE YOU HERE?]
// Muntaha Chowdhury
// [2024] November 27 - January 24
// Capstone Project


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  glitchGif = loadImage('assets/images/endings/glitch.gif');
  // interacts with ONLY the "PreLoad()" of every file

  musicPreLoad();
  homePreLoad();
  setPreLoad();
  invPreLoad();
  potionPreLoad();
  splbkPreLoad();
  pagePreLoad();
  batPreLoad();
  charPreLoad();
  settingsPreLoad();
}

function setup() {
  // interacts with ONLY the "Setup()" of every file
  createCanvas(windowWidth, windowHeight);

  loadGame();
  musicSetup();
  setSetup();
  invSetup();
  potionSetup();
  splbkSetup();
  trnkSetup();
  pageSetup();
  diaSetup();
  batSetup();
  charSetup();
  settingsSetup();
}

function draw() {
  // interacts with ONLY the "Con()" of every file
  background(220);


  if (endingInProgress) endingCon()
  else {
    if (currentSet === 0) homeCon();
    else if (!showedInstructions) instructionsCon();
    else {
      setCon();
      battleCon();
      trinketsCon();
      pageCon();
      charCon();
      potionCon();
      inventoryCon();
      spellBookCon();
      dialogueCon();
      animationsCon();
    }
    settingsCon();
  }
  musicCon();
}


function mousePressed() {
  // interacts with ONLY the "Pressed()" of every file


  if (!settingsVisible) {
    if (currentSet === 0)  homePressed();
    else if (!showedInstructions)  instPressed();
    else {
      if (battleState)  batPressed();
      trnkPressed();
      pagePressed();
      potionPressed();
      invPressed();
      splbkPressed();
      diaPressed();
    }
  }
  settingsPressed();
}



function keyPressed() {
  // interacts with ONLY the "KeyPressed()" of every file
  charKey();
  if (currentSet !== 0 && set[currentSet][currentSubSet][1] === true) {
    cheatsTried();
  }
}