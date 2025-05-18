function increment() {
  counter++;
}

function preload() {
  // Load player fish
  playerRight = loadImage("assets/hero-right.gif");
  playerLeft = loadImage("assets/hero-left.gif");
  heroDeath = loadImage("assets/blood1.gif");

  // Load Scenery
  bottomSand = loadImage("assets/floor.png");
  seaweedMed = loadImage("assets/swm1.gif");
  seaweedMed2 = loadImage("assets/swm2.gif");
  startButton = loadImage("assets/startButton.png"); //loadImage("assets/startButton.png");
  startButtonClicked = loadImage("assets/startButtonClicked.png");
  pauseButton =  loadImage("assets/paused.png");
  pauseButtonClicked = loadImage("assets/pausedClicked.png");
  logo = loadImage("assets/logo.png");

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
  // Player
  hr = new Hero("Player1", playerx, playery, 24, 24, 100, playerRight);

  // Scenery
  scenery.push(new Scenery(seaweedMed, 42, 664, 0, 0));
  scenery.push(new Scenery(seaweedMed2, 340, 668, 0, 0));
  scenery.push(new Scenery(seaweedMed, 242, 664, 0, 0));
  scenery.push(new Scenery(seaweedMed, 542, 664, 0, 0));
  scenery.push(new Scenery(seaweedMed, 1002, 664, 0, 0));
  scenery.push(new Scenery(seaweedMed2, 1043, 668, 0, 0));
  scenery.push(new Scenery(seaweedMed, 1124, 664, 0, 0));

  // Buttons
  buttons.push(new Button(startButton,575, 600, 100, 30, ButtonTypes.START));
  buttons.push(new Button(startButtonClicked,575, 600, 100, 30, ButtonTypes.STARTCLICKED));
  buttons.push(new Button(pauseButton,625, 370, 30, 30, ButtonTypes.PAUSE));
  buttons.push(new Button(pauseButtonClicked,625, 370, 30, 30, ButtonTypes.PAUSECLICKED));
  buttonFactory = new ButtonFactory(buttons);

  // Fish
  for (let i = 0; i < 10; i++) {   
    let enemyStartRandom = random(0.1,1);
    let enemyTiltRandom = random(-1,1);
    let enemyAngleRandom = random(0.1,1);
    let enemySpeedRandom = random(eSpeedMin, eSpeedMax);   
    let spriteMediumRandom = floor(random(0, enemiesRhs.length));  
    let spriteSmallRandom = floor(random(0, enemiesSmallRhs.length));
    let spriteBigRandom = floor(random(0, enemiesBigRhs.length));
    let spriteMediumX = random(width);
    let spriteMediumY = random(height);
    let spriteSmallX = random(width);
    let spriteSmallY = random(height);
    let spriteBigX = random(width);
    let spriteBigY = random(height);

    let es = new Enemy('Enemy'+i, spriteSmallX, spriteSmallY, 12, 30, enemiesSmallRhs[spriteSmallRandom], floor(random(0,14)), enemyStartRandom, enemyTiltRandom, enemyAngleRandom, enemySpeedRandom, true);
    let em = new Enemy('Enemy'+i, spriteMediumX, spriteMediumY, 0, 0, enemiesRhs[spriteMediumRandom], floor(random(0,25)), enemyStartRandom, enemyTiltRandom, enemyAngleRandom, enemySpeedRandom, true);
    let el = new Enemy('Enemy'+i, spriteBigX, spriteBigY, 0, 0, enemiesBigRhs[spriteBigRandom], floor(random(0,40)), enemyStartRandom, enemyTiltRandom, enemyAngleRandom, enemySpeedRandom, true);
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
  image(bottomSand, 0, 698);
  currentState = GAME_STATE.STARTING;

  for (let i = 0; i < scenery.length; i++) {
    scenery[i].show();
  }

  if (paused) {
    let pB = buttons.find(x => x.type == ButtonTypes.PAUSE); 
    if (pB) {
      pB.show();
    } 
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].type == ButtonTypes.START) {
        buttons.splice(i,1); 
      }
    }
  }
  else {
    if (!started) {
      buttonFactory.add(new Button(startButton,575, 600, 100, 30, ButtonTypes.START));
      buttonFactory.get(ButtonTypes.START).show();

      image(logo, 250, 100, 800, 400);

      if (mouseX >= 575 && mouseX <= 675) {
        if (mouseY >= 600 && mouseY <= 630) {
          buttonFactory.remove(ButtonTypes.START);
          buttonFactory.get(ButtonTypes.STARTCLICKED).show();
        }
      }
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
      hr.showLeft(playerLeft);
      hr.moveLeft();
    }

    if(keyIsDown(RIGHT_ARROW)) {
      hr.showRight(playerRight);
      hr.moveRight();
    }

    // Small Enemies
    for (let i = 0; i < enemiesSmall.length; i++) {
      enemiesSmall[i].move();
      enemiesSmall[i].show();
      if (enemiesSmall[i].checkBounds()) {
          enemiesSmall[i].hide();    
      } else {
        if (hr.intersects(enemiesSmall[i])) {
            enemiesSmall[i].hide();   
          if (enemiesSmall[i] != undefined) {
              if (hr.checkDeath(enemiesSmall[i].health) == 0) {
                
            }
          }
        } 
      }
    }

    // Medium Enemies
    // for (let i = 0; i < enemiesMedium.length; i++) {
    //   enemiesMedium[i].move();
    //   enemiesMedium[i].show();
    //   if (enemiesMedium[i].checkBounds()) {
    //      enemiesMedium[i].hide();    
    //   } else {
    //     if (hr.intersects(enemiesMedium[i])) {
    //          enemiesMedium[i].hide(); 
    //       if (enemiesMedium[i] != undefined) {
    //           if (hr.checkDeath(enemiesMedium[i].health) == 0) {
                
    //         }
    //       }
    //     } 
    //   }
    // }

    // // // Big Enemies
    // for (let i = 0; i < enemiesBig.length; i++) {
    //   enemiesBig[i].move();
    //   enemiesBig[i].show();
    //   if (enemiesBig[i].checkBounds()) {
    //       enemiesBig[i].hide(); 
    //   } else {
    //     if (hr.intersects(enemiesBig[i])) {
    //       enemiesBig[i].hide(); 
    //       if (enemiesBig[i] != undefined) {
    //           if (hr.checkDeath(enemiesBig[i].health) == 0) {
                
    //         }
    //       }
    //     } 
    //   }
    // }
  }
}

function addEnemyLhs() {
  let r = floor(random(0, enemiesLhs.length));
  var enem = new Enemy("Test", 1200, floor(random(0, 720)), 100, enemiesLhs[r]);
  enem.display();
}

function addEnemyRhs() {
  let r = floor(random(0, enemiesLhs.length));
  var enem = new Enemy("Test", floor(random(0, 1200)), 720, 100, enemiesRhs[r]);
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
    paused = !paused;
    if (paused) {
      noLoop();
    } else {
      loop();
    }
  }
}

function mouseClicked() {
  if (mouseX >= 575 && mouseX <= 675) {
    if (mouseY >= 600 && mouseY <= 630) {
      started = true;
    }
  }
}
