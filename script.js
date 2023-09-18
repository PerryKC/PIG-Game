'use strict';
// Jonas uses flowchart, chart of all possible outcomes
// use diagrams.net for these flowcharts
// # is to select ID, . is for class
// put 'El' at the end to clarify it's the element

// Selecting Elements
// use getElementById instead of query selector, either is ok
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// let statements sets these values so they can be accessed outside of function
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
// run function for when game first launches
init();

// We set this function to keep code dry
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// adds hidden to class list of element
// We added a 'hidden' element to css file

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    // Note the way Math.random() returns a decimal number between 0 and 1
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1, if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      // currentScore = currentScore + dice; // long form
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; // CHANGE LATER
    } else {
      // Switch to next player
      switchPlayer();
      // Which player is the active player?
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // toggle adds class if it is not there, if it is there, it will remove it
      // *TOGGLE IS AWESOME*
      // remember with classes don't use a period.
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      // Now reset current score
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Need to use . with query selector here
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }

  // Finish the game

  // Switch to next player
});

// Click New Game- reset all values
// User Attempt

// btnNew.addEventListener('click', function () {
//   if (playing) {
//     score0El.textContent = 0;
//     score1El.textContent = 0;
//     current0El.textContent = 0;
//     current1El.textContent = 0;
//     player0El.classList.remove('player--winner');
//     player1El.classList.remove('player--winner');
//     player0El.classList.add('player--active');
//     player1El.classList.remove('player--active');
//   }
// });

// Jonas's Attempt
// Ok if you tell Javascript to remove something that isn't there or vice versa
// Big difference is Jonas's has no "if (playing) function", When game is over playing is false
// Jonas puts starting conditions into a var function called init
// btnNew.addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
// });

// don't call init function, click will call function
// btnNew.addEventListener('click', init);
