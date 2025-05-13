function increment() {
  counter++;
}

function preload() {
  // Load hero fish
  heroRight = loadImage("assets/hero-right.gif");
  heroLeft = loadImage("assets/hero-left.gif");
  heroDeath = loadImage("assets/blood1.gif");

  // Load Scenery
  bottomSand = loadImage("assets/floor.png");
  seaweedMed = loadImage("assets/swm1.gif");
  seaweedMed2 = loadImage("assets/swm2.gif");
  startButton = loadImage("assets/startButton.png");
  startButtonClicked = loadImage("assets/startButtonClicked.png");

  // Load medium enemy fish
  for (var i = 0; i <= 7; i++) {
    enemiesRhs[i] = loadImage("assets/emr" + i + ".gif");
    enemiesLhs[i] = loadImage("assets/eml" + i + ".gif");
  }
  for (var i = 0; i <= 14; i++) {
    enemiesSmallRhs[i] = loadImage("assets/esr" + i + ".gif");
    enemiesSmallLhs[i] = loadImage("assets/esl" + i + ".gif");
  }
  for (var i = 0; i <= 2; i++) {
    enemiesBigRhs[i] = loadImage("assets/elr" + i + ".gif");
    enemiesBigLhs[i] = loadImage("assets/ell" + i + ".gif");
  }
}

function setup() {
  createCanvas(1280, 720);
  textAlign(CENTER, CENTER);
  textFont('Arial');
  setupGame();
}

function setupGame() {
  hr = new Hero("Player1", herox, heroy, 24, 24, 100, heroRight);
  for (let i = 0; i < 10; i++) {   
    let enemyStartRandom = random(0.1,1);
    let enemyTiltRandom = random(-1,1);
    let enemyAngleRandom = random(0.1,3);
    let enemySpeedRandom = random(0.1,3);   
    let spriteMediumRandom = floor(random(0, enemiesRhs.length));  
    let spriteSmallRandom = floor(random(0, enemiesSmallRhs.length));
    let spriteBigRandom = floor(random(0, enemiesBigRhs.length));
    let spriteMediumX = random(width);
    let spriteMediumY = random(height);
    let spriteSmallX = random(width);
    let spriteSmallY = random(height);
    let spriteBigX = random(width);
    let spriteBigY = random(height);

    let es = new Enemy('Enemy'+i, spriteSmallX, spriteSmallY, 0, 0, enemiesSmallRhs[spriteSmallRandom], floor(random(0,1000)), enemyStartRandom, enemyTiltRandom, enemyAngleRandom, enemySpeedRandom);
    let em = new Enemy('Enemy'+i, spriteMediumX, spriteMediumY, 0, 0, enemiesRhs[spriteMediumRandom], floor(random(0,1000)), enemyStartRandom, enemyTiltRandom, enemyAngleRandom, enemySpeedRandom);
    let el = new Enemy('Enemy'+i, spriteBigX, spriteBigY, 0, 0, enemiesBigRhs[spriteBigRandom], floor(random(0,1000)), enemyStartRandom, enemyTiltRandom, enemyAngleRandom, enemySpeedRandom);
    enemiesMedium.push(em);
    enemiesSmall.push(es);
    enemiesBig.push(el);
  }
}

function resetGame() {
  enemiesMedium = [];
  enemiesSmall = [];
  enemiesBig = [];
  setupGame();
}

function draw() {
  background(30, 142, 239);
  image(startButton, 575, 600, 100, 30);
  image(bottomSand, 0, 698);
  image(seaweedMed2, 440, 668);
  image(seaweedMed, 42, 664);
  image(seaweedMed2, 340, 668);
  image(seaweedMed, 242, 664);
  image(seaweedMed, 542, 664);
  image(seaweedMed, 1002, 664);
  image(seaweedMed2, 1043, 668);
  image(seaweedMed, 1124, 664);

  if (mouseX >= 575 && mouseX <= 675) {
    if (mouseY >= 600 && mouseY <= 630) {
      image(startButtonClicked, 575, 600, 100, 30);
    }
  }

  if (started) {
    hr.show(hr);

    if(keyIsDown(UP_ARROW)) {
      hr.moveUp();
    }

    if(keyIsDown(DOWN_ARROW)) {
      hr.moveDown();
    }

    if(keyIsDown(LEFT_ARROW)) {
      hr.showLeft(heroLeft);
      hr.moveLeft();
    }

    if(keyIsDown(RIGHT_ARROW)) {
      hr.showRight(heroRight);
      hr.moveRight();
    }

    // Small Enemies
    for (let i = 0; i < enemiesSmall.length; i++) {
      enemiesSmall[i].move();
      enemiesSmall[i].show();
      if (enemiesSmall[i].checkBounds()) {
          enemiesSmall.splice(i,1);    
      } else {
        if (hr.intersects(enemiesSmall[i])) {
          enemiesSmall.splice(i,1);
          if (enemiesSmall[i] != undefined) {
              if (hr.checkDeath(enemiesSmall[i].health) == 0) {
                
            }
          }
        } 
      }
    }

    // Medium Enemies
    for (let i = 0; i < enemiesMedium.length; i++) {
      enemiesMedium[i].move();
      enemiesMedium[i].show();
      if (enemiesMedium[i].checkBounds()) {
        enemiesMedium.splice(i,1);
      } else {
        if (hr.intersects(enemiesMedium[i])) {
          enemiesMedium.splice(i,1);
          if (enemiesMedium[i] != undefined) {
              if (hr.checkDeath(enemiesMedium[i].health) == 0) {
                
            }
          }
        } 
      }
    }

    // // Big Enemies
    for (let i = 0; i < enemiesBig.length; i++) {
      enemiesBig[i].move();
      enemiesBig[i].show();
      if (enemiesBig[i].checkBounds()) {
        enemiesBig.splice(i,1);
      } else {
        if (hr.intersects(enemiesBig[i])) {
          enemiesBig.splice(i,1);
          if (enemiesBig[i] != undefined) {
              if (hr.checkDeath(enemiesBig[i].health) == 0) {
                
            }
          }
        } 
      }
    }
  }
}

function addEnemyRhs() {
  let r = floor(random(0, enemiesLhs.length));
  var enem = new Enemy("Test", 1200, floor(random(0, 720)), 100, enemiesLhs[r]);
  enem.display();
}

function gameOver() {
  background(0, 0, 0);
  fill(255, 255, 255);
  text("Game over! Press P to play again", width/2, height/2);
}

function keyPressed() {
  if(key == 'p') {
      setup();
    }
  if (keyCode == 32) {
    if (paused) {
      noLoop();
    } else {
      loop();
    }
    paused = !paused;
  }
}

function mouseClicked() {
  if (mouseX >= 575 && mouseX <= 675) {
    if (mouseY >= 600 && mouseY <= 630) {
      started = true;
    }
  }
}
