'use strict';

let scores, roundScore, activePlayer, gamePlaying, dice1, dice2, diceDOM, lastDice;

let init = function() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
  document.getElementById('scoreSet').value = '100';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  
  document.querySelector('.player-0-panel').classList.add('active');

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';


}
init();


document.querySelector('.btn-roll').addEventListener('click', function() {
  
  if (gamePlaying) {
    
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    
    document.querySelector('.dice-1').style.display = 'block'
    document.querySelector('.dice-2').style.display = 'block'
    document.querySelector('.dice-1').src = `dice-${dice1}.png`;
    document.querySelector('.dice-2').src = `dice-${dice2}.png`;
    
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += (dice1 + dice2);
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }

    /*
    if (dice === 6 && lastDice === 6) {
      // Player looses score
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = '0';
      nextPlayer();
    } else if (dice !== 1 && dice !== 6) {
      roundScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
      lastDice = 0;
    } else if (dice === 6) {
      roundScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
      lastDice = dice;
    } else {
      nextPlayer();
    }
    */

  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    let input = document.getElementById('scoreSet').value;
    let winningScore;

    if (isNaN(input) === false) {
      winningScore = input;
    } else {
      document.getElementById('scoreSet').value = '100';
    }

    if (scores[activePlayer] >= winningScore) {

      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      gamePlaying = false;
    } else {
      nextPlayer();
    }

  }

});


let nextPlayer = function() {

  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  
  document.getElementById(`current-0`).textContent = '0';
  document.getElementById(`current-1`).textContent = '0';

  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  lastDice = 0;

}

document.querySelector('.btn-new').addEventListener('click', init);