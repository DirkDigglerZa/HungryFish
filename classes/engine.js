class Engine {
    enemyStartRandom = random(0.1,1);
    enemyStartRandom = random(0.1,1);
    enemyTiltRandom = random(-1,1);
    enemyAngleRandom = random(0.1,3);
    enemySpeedRandom = random(0.1,3);   
    spriteMediumRandom = floor(random(0, enemiesRhs.length));  
    spriteSmallRandom = floor(random(0, enemiesSmallRhs.length));
    spriteBigRandom = floor(random(0, enemiesBigRhs.length));
    spriteMediumX = random(width);
    spriteMediumY = random(height);
    spriteSmallX = random(width);
    spriteSmallY = random(height);
    spriteBigX = random(width);
    spriteBigY = random(height);

    constructor(player, smallFish, mediumFish, bigFish, largeFish, biggestFish) {
        this.player = player;
        this.smallFish = smallFish;
        this.mediumFish = mediumFish;
        this.bigFish = bigFish;
        this.largeFish = largeFish;
        this.biggestFish = biggestFish;
    }

    


}