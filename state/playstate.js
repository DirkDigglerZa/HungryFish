// Simple PlayState for demonstration
class PlayState extends BaseState {
 init(data) {
    this.player = { x: width / 2, y: height / 2 };
    this.level = data ? data.level : 1;
    this.lives = data ? data.lives : 3;
    this.enemies = [];
    this.rngHelper = new RngHelper();
    this.difficulty = DIFFICULTY.one;
    this.player = new Hero('Player1', width / 2, height / 2, 24, 24, 100, playerRight);

    // Constants
    this.NUM_SMALL_ENEMIES = 14;
    this.NUM_MEDIUM_ENEMIES = 7;
    this.NUM_LARGE_ENEMIES = 2;

    // Visual effects
    this.particles = [];
    this.titleOffset = 0;
    this.fadeAlpha = 0; 
    
    // Generate sand particles for texture
    this.sandParticles = [];
    for (let i = 0; i < 1800; i++) {
      this.sandParticles.push({
        x: random(width),
        y: random(height * 0.9, height),
        size: 4,
        color: random(180, 220)
      });
    }

    // Create background particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: random(width),
        y: random(height),
        size: random(3, 8),
        speed: random(0.5, 2),
        alpha: random(50, 150)
      });
    }
    
    // Animation variables
    this.animationTime = 0;

    // Setup Small enemies
    for (let i = 0; i < GLOBALS.numberSmallEnemies; i++) {
      let newEnemy = new Enemy("SmallFish" + i.toString(), 
        this.rngHelper.generateSingleRng(width, true),
        this.rngHelper.generateSingleRng(height, true), 
        0, 
        0, 
        enemiesSmallLhs[i],
        this.rngHelper.generateRng(5, 1000, true),
        this.rngHelper.getStartRng(),
        this.rngHelper.getTiltRng(),
        this.rngHelper.getAngleRng(),
        this.rngHelper.getSpeedRng(),
        true);
      this.enemies.push(newEnemy);
    }

    // Setup Medium Enemies
    for (let i = 0; i < GLOBALS.numerMediumEnemies; i++) {
      let newEnemy = new Enemy("MediumFish" + i.toString(), 
        this.rngHelper.generateSingleRng(width, true),
        this.rngHelper.generateSingleRng(height, true), 
        0, 
        0, 
        enemiesLhs[i],
        this.rngHelper.generateRng(5, 1000, true),
        this.rngHelper.getStartRng(),
        this.rngHelper.getTiltRng(),
        this.rngHelper.getAngleRng(),
        this.rngHelper.getSpeedRng(),
        true);
      this.enemies.push(newEnemy);
    }
  }
  
  draw() {
    // Update animation time
    this.animationTime += 0.02;

    // Update particles
    for (let particle of this.particles) {
      particle.y -= particle.speed;
      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = random(width);
      }
    }

    // Ocean background gradient
    for (let i = 0; i <= height * 1; i++) {
      const inter = map(i, 0, height * 1, 0, 1);
      const c = lerpColor(color(100, 200, 255), color(20, 80, 150), inter);
      stroke(c);
      line(0, i, width, i);
    }    

    // Draw Player
    this.player.show();
    this.showPlayerBubbles(false);

    // Draw particles
    this.drawParticles();

    // Draw the Seaweed
    image(seaweedMed, 0, height-46);

    // Draw enemies and handle collisions
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].show(); 
      this.enemies[i].move();
      if (this.enemies[i].checkBounds()) {
          this.enemies[i].hide();    
      } else {
        if (this.player.intersects(this.enemies[i])) {
            this.enemies[i].hide(); 
          if (this.enemies[i] != undefined) {
              this.player.attackResult(this.enemies[i].health);
              if (this.player.getHealth() > 0) {
            
              } else {
                // Game over
                // stateManager.switchTo('gameOver');
              }
          }
        } 
      }
    }

    // Handle Player inputs                              
    if(keyIsDown(UP_ARROW)) {
      this.player.moveUp();
      this.showPlayerBubbles(true);
    }
    if(keyIsDown(DOWN_ARROW)) {
      this.player.moveDown();
      this.showPlayerBubbles(true);
    }
    if(keyIsDown(LEFT_ARROW)) {
      this.player.showLeft(playerLeft);
      this.player.moveLeft();
      this.showPlayerBubbles(true);
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.player.showRight(playerRight);
      this.player.moveRight();
      this.showPlayerBubbles(true);
    }

    // UI elements
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Level ${this.level} - Lives: ${this.lives}`, width / 2, 50);
    text('Press ESC to return to menu', width / 2, height - 50);
  }

  drawParticles() {
    // Draw floating particles (bubles)
    for (let particle of this.particles) {
      fill(255, 255, 255, particle.alpha);
      noStroke();
      ellipse(particle.x, particle.y, particle.size);
      //rect(particle.x, particle.y, 4, 4);
    }
  }
  
  keyPressed() {
    if (keyCode === ESCAPE) {
      stateManager.switchTo('menu');
    }
  }

  keyIsDown() { 
    if(code == 'ArrowUp') {
      this.player.moveDown();
    }
    if(code == LEFT_ARROW) {
      this.player.showLeft(playerLeft);
      this.player.moveLeft();
    }
    if(code == RIGHT_ARROW) {
      this.player.showRight(playerRight);
      this.player.moveRight();
    }
  }

  showPlayerBubbles(moving) {
    if (moving) {
      this.player.createBubbles(500, 1000);
      this.player.drawBubbles();
      this.player.updateBubbles();
    }
  }
}
