'use strict';

const rollDice = document.querySelector('.btn--roll')
const hold = document.querySelector('.btn--hold')
const NewGame = document.querySelector('.btn--new')

const playerOneSection = document.querySelector('.player--0')

const playerSecondSection = document.querySelector('.player--1')

const diceBox = document.querySelector('.dice')

let scores = [0, 0]
let currentScore = 0
let activePlayer = 0
let playing = true

const switchPlayer = () => {
  currentScore = 0
  document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    
  activePlayer = activePlayer === 0 ? 1 : 0

  playerOneSection.classList.toggle('player--active')
  playerSecondSection.classList.toggle('player--active')
}

const rollBtn = () => {
  if(playing) {
    const randomNumber = Math.trunc(Math.random() * 6 ) + 1
    diceBox.classList.remove('hidden')
    diceBox.src = `dice-${randomNumber}.png`

    if(randomNumber !== 1) {
      currentScore += randomNumber

      document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    }else if(randomNumber === 1) {
      switchPlayer()
    }
  }
}

rollDice.addEventListener('click', rollBtn)

const holdBtn = () => {
  if(playing) {
    scores[activePlayer] += currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]

    if(scores[`${activePlayer}`] >= 100) {
      playing = false

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    }else {
      switchPlayer()
    }
  }
}

hold.addEventListener('click', holdBtn)

const restartGame = () => {
  playing = true

  activePlayer = 0
  currentScore = 0
  scores[0] = currentScore
  scores[1] = currentScore

  diceBox.classList.add('hidden')

  document.querySelector(`#score--0`).textContent = 0
  document.querySelector(`#score--1`).textContent = 0
  document.querySelector(`#current--0`).textContent = 0
  document.querySelector(`#current--1`).textContent = 0

  document.querySelector(`.player--0`).classList.remove('player--winner')
  document.querySelector(`.player--1`).classList.remove('player--winner')
  document.querySelector(`.player--0`).classList.add('player--active')
  document.querySelector(`.player--1`).classList.remove('player--active')
}

NewGame.addEventListener('click', restartGame)

document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    rollBtn()
  }else if(e.key === ' ') {
    holdBtn()
  }else if(e.key === 'r' || e.key === 'R') {
    restartGame()
  }
})