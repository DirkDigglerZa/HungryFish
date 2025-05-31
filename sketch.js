// Global variables
let stateManager;
let gameFont;
let buttonSound, bgMusic;

function preload() {

}

function setup() { 
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
