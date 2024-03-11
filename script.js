'use strict';

const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
let score = [0, 0];
let current = [0, 0];
let isPlaying = true;
let activePlayer = 0;

const init = function () {
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  score = [0, 0];
  current = [0, 0];
  isPlaying = true;
  activePlayer = 0;
  dice.classList.add('hidden');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};
init();
const toggle = function () {
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  current = [0, 0];
};
const updateCurrent = function (activePlayer, number) {
  document.getElementById(`current--${activePlayer}`).textContent = number;
};
const updateScore = function (activePlayer) {
  score[activePlayer] += current[activePlayer];
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    isPlaying = false;
  } else {
    updateCurrent(activePlayer, 0);
    toggle();
  }
};
rollDice.addEventListener('click', function () {
  dice.classList.remove('hidden');
  if (isPlaying) {
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber === 1) {
      updateCurrent(activePlayer, 0);
      toggle();
    } else {
      current[activePlayer] += randomNumber;
      updateCurrent(activePlayer, current[activePlayer]);
    }
  }
});
hold.addEventListener('click', function () {
  if (isPlaying) {
    updateScore(activePlayer);
  }
});
newGame.addEventListener('click', function () {
  init();
});
