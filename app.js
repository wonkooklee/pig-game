/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

'use strict';

// 변수를 선언한다


// roll-dice의 기능
// 승자 조건문
// 만약 해당 플레이어가 hold를 눌러 score가 100 이상이면 기능정지 {
// 1이 아닌 숫자일 경우
// 1. 난수를 생성하여 변수 값에 할당한다 let dice
// 2. 점수를 누적한다 let roundScore
// 3. 주사휘가 나타나고(display) 이미지를 숫자에 맞게 표시한다(src)
// 4. 누적된 점수는 플레이어의 current score로 표시된다
// }
// 1일 경우
// 5. 플레이어 전환

let scores, roundScore, activePlayer, gamePlaying, dice, diceDOM;

// 게임초기화
// 1. 변수 초가화 scores, activePlayer, roundScore
// 2. 승자 조건문의 인자값이 true 다시 작동케 함
// 3. 플레이어에 할당된 active, winner 클래스를 삭제하고, 플레이어 1에게 다시 active 할당
// 4. 플레이어 이름 초기화
// 5. 플레이어 점수표시 초기화

let init = function() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceDOM = document.querySelector('.dice');

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

  diceDOM.style.display = 'none';

}
init();



document.querySelector('.btn-roll').addEventListener('click', function() {
  
  if (gamePlaying) {
    
    dice = Math.floor(Math.random() * 6) + 1;

    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;

    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
    
  }

});

// hold 기능
// 승자 조건문
// 1. 점수를 저장한다.  / score = [0, 0] 플레이어의 값을 인덱스로 player1 = score[0], player2 = score[2]
// 만약 해당 플레이어가 hold를 눌러 score가 100 이상이면 기능정지{
// 1-1. 승자 조건문의 인자값을 false로 변경
// 1-2. 플레이어 이름을 'WINNER!'로 변경
// }
// 2. 플레이어를 전환한다

document.querySelector('.btn-hold').addEventListener('click', function() {
  
  if (gamePlaying) {

    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {

      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      diceDOM.style.display = 'none';
      gamePlaying = false;
    } else {
      nextPlayer();
    }

  }

});


// 플레이어 전환
// 1. 현재 라운드 점수를 초기화한다 roundScore = 0
// 2. active 클래스 toggle target.classList.toggle = ('active')
// 3. 현재 플레이어를 전환하는 조건문
//   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
// 4. 현재 점수 초기화 target.textContent = '0'
// 5. 주사위가 사라진다(display = 'none')

let nextPlayer = function() {

  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  
  document.getElementById(`current-${activePlayer}`).textContent = '0';

  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');

  diceDOM.style.display = 'none';

}


// 게임초기화 버튼
// 1. 변수 초가화 scores, activePlayer, roundScore
// 2. 승자 조건문의 인자값이 true 다시 작동케 함
// 3. 플레이어에 할당된 active, winner 클래스를 삭제하고, 플레이어 1에게 다시 active 할당
// 4. 플레이어 이름 초기화
// 5. 플레이어 점수표시 초기화

document.querySelector('.btn-new').addEventListener('click', init);