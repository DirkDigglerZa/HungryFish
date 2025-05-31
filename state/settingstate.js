class SettingsState extends BaseState {
  init() {
    this.volume = 50;
    this.difficulty = 1;
  }

  draw() {
    background(40, 40, 40);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Settings', width / 2, 50);
    
    textSize(16);
    text(`Volume: ${this.volume}%`, width / 2, 150);
    text(`Difficulty: ${this.difficulty}`, width / 2, 200);
    text('Press ESC to go back', width / 2, height - 50);
  }

  keyPressed() {
    if (keyCode === ESCAPE) {
      stateManager.switchTo('menu');
    }
  }
}
