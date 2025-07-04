let seaweedMed, playerRight;
let enemiesRhs = [], enemiesLhs = [], enemiesSmallRhs = [], enemiesSmallLhs = [], enemiesBigRhs = [], enemiesBigLhs = [];
let lastDrawTime = 0; eSpeedMin = 0.2; eSpeedMax = 1.4; interval = 2000;

const GLOBALS = {
    numberSmallEnemies : 18,
    numerMediumEnemies : 13,
    numberLargeEnemies : 3
}

const DIFFICULTY = {
    one : 1,
    two : 2,
    three : 3,
    four : 4,
    five : 5,
    six : 6,
    seven : 7
}