// Variable to hold the current state of the game
let currentState;

// Define the possible game states
const GAME_STATE = {
  STARTING: "STARTING",
  PAUSED: "PAUSED",
  STARTED: "STARTED",
  GAME_OVER: "GAME_OVER"
};

// Variable holding the users progression in the game
let progressionState;

// Define the possible game progression
const GAME_PROGRESSION = {
    ONE : 1,
    TWO : 1,
    THREE : 1,
    FOUR : 1,
    FIVE : 1,
    SIX : 1,
    SEVEN : 1,
    EIGHT : 1,
    NINE : 9,
    TEN : 10,
    ENDGAME : 100
}

// Defined values to increase the user score based on level
const SCORE_PROGRESSION = {
    ONE : 3,
    TWO : 5,
    THREE : 7,
    FOUR : 9,
    FIVE : 13,
    SIX : 18,
    SEVEN : 22,
    EIGHT : 29,
    NINE : 35,
    TEN : 50,
    ENDGAME : 75
}