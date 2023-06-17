"use strict";

// Selecting elements--> EL means DOM element
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1"); // Another way--> faster
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

// Initial conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

//Initial Scores
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; // hold state of playing

// Switch player

const switchPlayer = function () {
  currentScore = 0; // resetting
  document.getElementById(`current--${activePlayer}`).textContent = 0; // active player loses score
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active"); // add if absent and remove if present
  player1EL.classList.toggle("player--active"); // add if absent and remove if present
};

// Rolling dice

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate a rondom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);--->checking
    //2. Display dice
    diceEL.classList.remove("hidden");
    // manipulate src attribute
    diceEL.src = `dice-${dice}.png`;

    // 3.Check for 1

    if (dice != 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Lose score and Switch
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add currScore to active player's
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check for winner
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEL.classList.add("hidden");
    } else {
      // toggle players
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  player0EL.classList.add("player--active");
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
});
