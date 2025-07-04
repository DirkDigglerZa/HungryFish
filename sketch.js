// Global variables
let stateManager;
let gameFont;
let buttonSound, bgMusic;

function preload() {
  // Scenery
  seaweedMed = loadImage('assets/swm2.gif');

  // Player
  playerRight = loadImage('assets/hero-right.gif');
  playerLeft = loadImage('assets/hero-left.gif');

  // Effects
  blood2 = loadImage('assets/blood2.gif');

  // Enemies
  for (var i = 0; i <= GLOBALS.numerMediumEnemies; i++) {
    enemiesRhs[i] = loadImage('assets/emr' + i + '.gif');
    enemiesLhs[i] = loadImage('assets/eml' + i + '.gif');
  }
  for (var i = 0; i <= GLOBALS.numberSmallEnemies; i++) {
    enemiesSmallRhs[i] = loadImage('assets/esr' + i + '.gif');
    enemiesSmallLhs[i] = loadImage('assets/esl' + i + '.gif');
  }
  for (var i = 0; i <= 2; i++) {
    enemiesBigRhs[i] = loadImage('assets/elr' + i + '.gif');
    enemiesBigLhs[i] = loadImage('assets/ell' + i + '.gif');
  }
}

function setup() { 
  // Init Canvas
  createCanvas(1440, 900);
  
  // Initialize state manager
  stateManager = new StateManager();
  
  // Register game states
  stateManager.addState('menu', MenuState);
  stateManager.addState('game', PlayState);
  stateManager.addState('settings', SettingsState);
  stateManager.addState('gameOver', GameOverState);
  
  // Start with the menu
  stateManager.switchTo('menu');
}

function draw() { 3
  // The state manager handles all updates and drawing
  stateManager.update();
  stateManager.draw();
}

// Input event forwarding to state manager
function keyPressed() {
  stateManager.keyPressed();
}

function mousePressed() {
  stateManager.mousePressed();
}

function keyReleased() {
  stateManager.keyReleased();
}

function mouseReleased() {
  stateManager.mouseReleased();
}
