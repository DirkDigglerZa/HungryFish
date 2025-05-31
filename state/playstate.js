class PlayState extends BaseState {
    init(data) {
    console.log('Starting game with data:', data);
    this.player = { x: width / 2, y: height / 2 };
    this.level = data ? data.level : 1;
    this.lives = data ? data.lives : 3;

    // Visual effects
    this.particles = [];
    this.titleOffset = 0;
    this.fadeAlpha = 0;
    
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
  }
  
  draw() {
     // Update animation time
    this.animationTime += 0.02;

     // Gradient background
    this.drawBackground();
    
    // Draw particles
    this.drawParticles();

    // Update particles
    for (let particle of this.particles) {
      particle.y -= particle.speed;
      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = random(width);
      }
    }

    textAlign(CENTER, CENTER);
    text(`Level ${this.level} - Lives: ${this.lives}`, width / 2, 50);
    text('Press ESC to return to menu', width / 2, height - 50);
  }

  drawBackground() {
    // Create a space-like gradient background
    for (let i = 0; i <= height; i++) {
      const inter = map(i, 0, height, 0, 1);
      const c = lerpColor(color(16, 117, 206), color(38, 153, 255), inter);
      stroke(c);
      line(0, i, width, i);
    }
  }
  
  drawParticles() {
    // Draw floating particles (bubles)
    for (let particle of this.particles) {
      fill(255, 255, 255, particle.alpha);
      noStroke();
      ellipse(particle.x, particle.y, particle.size);
    }
  }
  
  keyPressed() {
    if (keyCode === ESCAPE) {
      stateManager.switchTo('menu');
    }
  }
}
