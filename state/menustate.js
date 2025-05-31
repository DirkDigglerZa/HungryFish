class MenuState extends BaseState {
  init() {
    // Menu configuration
    this.title = "HUNGRY FISH";
    this.subtitle = "Press any button to start growing!";
    
    // Button setup
    this.setupButtons();
    
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
    this.buttonAnimOffset = 0;
    
    console.log("Menu state initialized");
  }
  
  setupButtons() {
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonSpacing = 70;
    const startY = height / 2 + 50;
    
    this.buttons = [
      {
        text: "🐠 START GAME",
        x: width / 2 - buttonWidth / 2,
        y: startY,
        w: buttonWidth,
        h: buttonHeight,
        action: "game",
        color: { r: 70, g: 130, b: 220 },
        hoverColor: { r: 90, g: 150, b: 240 }
      },
      {
        text: "⚙️ SETTINGS",
        x: width / 2 - buttonWidth / 2,
        y: startY + buttonSpacing,
        w: buttonWidth,
        h: buttonHeight,
        action: "settings",
        color: { r: 70, g: 170, b: 70 },
        hoverColor: { r: 90, g: 190, b: 90 }
      },
      {
        text: "🏆 HIGH SCORES",
        x: width / 2 - buttonWidth / 2,
        y: startY + buttonSpacing * 2,
        w: buttonWidth,
        h: buttonHeight,
        action: "highscores",
        color: { r: 220, g: 170, b: 50 },
        hoverColor: { r: 240, g: 190, b: 70 }
      },
      {
        text: "❌ EXIT",
        x: width / 2 - buttonWidth / 2,
        y: startY + buttonSpacing * 3,
        w: buttonWidth,
        h: buttonHeight,
        action: "exit",
        color: { r: 180, g: 60, b: 60 },
        hoverColor: { r: 200, g: 80, b: 80 }
      }
    ];
    
    this.hoveredButton = -1;
    this.selectedButton = -1;
  }
  
  update() {
    // Update animation time
    this.animationTime += 0.02;
    this.titleOffset = sin(this.animationTime) * 10;
    this.buttonAnimOffset = sin(this.animationTime * 2) * 3;
    
    // Fade in effect
    if (this.fadeAlpha < 255) {
      this.fadeAlpha += 3;
    }
    
    // Update particles
    for (let particle of this.particles) {
      particle.y -= particle.speed;
      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = random(width);
      }
    }
    
    // Check button hover
    this.hoveredButton = -1;
    for (let i = 0; i < this.buttons.length; i++) {
      const btn = this.buttons[i];
      if (this.isMouseOverButton(btn)) {
        this.hoveredButton = i;
        break;
      }
    }
    
    // Keyboard navigation
    this.handleKeyboardNavigation();
  }
  
  draw() {
    // Gradient background
    this.drawBackground();
    
    // Draw particles
    this.drawParticles();
    
    // Draw title
    this.drawTitle();
    
    // Draw buttons
    this.drawButtons();
    
    // Draw instructions
    this.drawInstructions();
    
    // Fade in overlay
    if (this.fadeAlpha < 255) {
      fill(0, 0, 0, 255 - this.fadeAlpha);
      rect(0, 0, width, height);
    }
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
  
  drawTitle() {
    // Main title with glow effect
    push();
    translate(width / 2, 120 + this.titleOffset);
    
    // Glow effect
    for (let r = 8; r > 0; r--) {
      fill(100, 150, 255, 15);
      textAlign(CENTER, CENTER);
      textSize(48 + r * 2);
      text(this.title, 0, 0);
    }
    
    // Main title
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text(this.title, 0, 0);
    
    // Subtitle
    fill(200, 200, 255, 180);
    textSize(16);
    text(this.subtitle, 0, 50);
    pop();
  }
  
  drawButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      const btn = this.buttons[i];
      const isHovered = this.hoveredButton === i;
      const isSelected = this.selectedButton === i;
      
      // Button animation offset
      const yOffset = isHovered ? this.buttonAnimOffset : 0;
      
      // Button shadow
      fill(0, 0, 0, 50);
      rect(btn.x + 3, btn.y + 3 + yOffset, btn.w, btn.h, 8);
      
      // Button background
      const btnColor = isHovered ? btn.hoverColor : btn.color;
      fill(btnColor.r, btnColor.g, btnColor.b);
      stroke(255, isHovered ? 150 : 80);
      strokeWeight(isSelected ? 3 : 1);
      rect(btn.x, btn.y + yOffset, btn.w, btn.h, 8);
      
      // Button text
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(isHovered ? 18 : 16);
      text(btn.text, btn.x + btn.w / 2, btn.y + btn.h / 2 + yOffset);
      
      // Selection indicator
      if (isSelected) {
        fill(255, 255, 0, 100 + sin(this.animationTime * 8) * 50);
        rect(btn.x - 5, btn.y + yOffset - 5, btn.w + 10, btn.h + 10, 12);
      }
    }
  }
  
  drawInstructions() {
    fill(150, 150, 200, 180);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text("Use mouse or arrow keys + ENTER to navigate", width / 2, height - 20);
  }
  
  // Helper methods
  isMouseOverButton(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
           mouseY >= btn.y && mouseY <= btn.y + btn.h;
  }
  
  handleKeyboardNavigation() {
    // This will be called from keyPressed via the state manager
  }
  
  // Input handling
  mousePressed() {
    if (this.hoveredButton >= 0) {
      this.activateButton(this.hoveredButton);
    }
  }
  
  keyPressed() {
    if (keyCode === UP_ARROW) {
      this.selectedButton = (this.selectedButton - 1 + this.buttons.length) % this.buttons.length;
      if (this.selectedButton < 0) this.selectedButton = this.buttons.length - 1;
    } else if (keyCode === DOWN_ARROW) {
      this.selectedButton = (this.selectedButton + 1) % this.buttons.length;
    } else if (keyCode === ENTER || key === ' ') {
      if (this.selectedButton >= 0) {
        this.activateButton(this.selectedButton);
      }
    }
  }
  
  activateButton(buttonIndex) {
    if (buttonIndex < 0 || buttonIndex >= this.buttons.length) return;
    
    const action = this.buttons[buttonIndex].action;
    
    // Play sound effect if available
    // if (buttonSound) buttonSound.play();
    
    // Handle different button actions
    switch (action) {
      case 'game':
        stateManager.switchTo('game', { level: 1, lives: 3 });
        break;
      case 'settings':
        stateManager.switchTo('settings');
        break;
      case 'highscores':
        // Could switch to a high scores state
        console.log('High scores not implemented yet');
        break;
      case 'exit':
        // In a web context, you might want to show a confirmation
        if (confirm('Are you sure you want to exit?')) {
          window.close();
        }
        break;
      default:
        console.log(`Action '${action}' not implemented`);
    }
  }
  
  exit() {
    // Cleanup when leaving the menu state
    console.log("Exiting menu state");
    // Stop background music if playing
    // if (bgMusic && bgMusic.isPlaying()) bgMusic.stop();
  }
}