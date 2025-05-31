class GameOverState extends BaseState {
  init(data) {
    this.score = data ? data.score : 0;
    this.reason = data ? data.reason : "Game Over";
  }
  
  draw() {
    background(40, 20, 20);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.reason, width / 2, height / 2 - 50);
    textSize(16);
    text(`Final Score: ${this.score}`, width / 2, height / 2);
    text('Press SPACE to return to menu', width / 2, height / 2 + 50);
  }
  
  keyPressed() {
    if (key === ' ') {
      stateManager.switchTo('menu');
    }
  }
}