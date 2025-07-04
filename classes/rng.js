const ENEMY_SETTINGS = {
    minSpeed : 2,
    maxSpeed : 5
}


const RNG = {
    startRng : 0.1,
    endRng : 1,
    startTiltRng : -1,
    endTiltRng : 1,
    startAngleRng : 0.1,
    endAngleRng : 1
}

class RngHelper {
    constructor() {
    }

    generateRng(randomStart, randomEnd, mustFloor) {
        if (mustFloor) {
            return floor(random(randomStart, randomEnd))
        } 
        return random(randomStart, randomEnd);
    }

    generateSingleRng(num, mustFloor) {
        if (mustFloor) {
            return floor(random(num))
        }
        return random(num);
    }

    getStartRng() {
        return random(RNG.startRng,RNG.endRng);
    }

    getSpeedRng() {
        return random(ENEMY_SETTINGS.minSpeed, ENEMY_SETTINGS.maxSpeed);
    }

    getTiltRng() {
        return random(RNG.startTiltRng,RNG.endTiltRng);
    }

    getAngleRng() {
        return random(RNG.startAngleRng,RNG.endAngleRng);
    }
}

// let spriteMediumRandom = floor(random(0, enemiesRhs.length));  
// let spriteSmallRandom = floor(random(0, enemiesSmallRhs.length));
// let spriteBigRandom = floor(random(0, enemiesBigRhs.length));
// let spriteMediumX = random(width);
// let spriteMediumY = random(height);
// let spriteSmallX = random(width);
// let spriteSmallY = random(height);
// let spriteBigX = random(width);
// let spriteBigY = random(height);