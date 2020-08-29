const cards = document.querySelectorAll('.memory-card');
const movesTag = document.querySelector('.moves') 
const redoTag = document.querySelector('.fa-redo')
const main = document.querySelector('.main')
const gameWon = document.querySelector('.game-won')
const replay = document.querySelector('.replay')



let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let cardCleared = 0;
let second = 0;
let minute = 0;
let countDown;


movesTag.textContent = moves;
redoTag.addEventListener('click', restartGame);
replay.addEventListener('click', restartGame);

function timer() {
  
  countDown = setInterval(function () {
  second += 1;
  document.getElementById('second').textContent = second;
  document.getElementById('minute').textContent = minute;

  if(second === 60) {          
    second = 0;
    minute += 1;
  }

  }, 1000);
}

function stopTimer() {
  clearInterval(countDown);
}

function flipCard() {

	if (lockBoard) return;
	if (this === firstCard) return;
	moves += 1;
	if (moves === 1) {
		timer();
	}
	movesTag.textContent = moves;
	this.classList.add('flip');
	
	if(!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;
		
		return;
	} 

	// second click
	secondCard = this;
	
	checkForMatch();	
}

function checkForMatch() {
	// do cards match?
	if(firstCard.dataset.name === secondCard.dataset.name) {
		disableCards();

		// Check winning
		cardCleared += 1;
		if(cardCleared === 8) {
			stopTimer();
			setTimeout(() => {
				document.querySelector('.move').textContent = moves;
				document.querySelector('.gameWontimeDislay').textContent = `${minute} Mins ${second} Secs`;
				main.style.display = 'none';
				gameWon.style.display = 'flex';				
			}, 2000)
		}
	} else {
		// not a match
		// remove the flip class(return to original position)
		unflipCards();		
	}
}

function unflipCards() {
	lockBoard = true;
	
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		
		resetBoard();
	}, 1500)
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function disableCards() {
	// It's a match
	// disable clickEvent to prevent futher clicking
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function restartGame() {
	document.location.reload();
}


function init() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 16);
		card.style.order = randomPos;
	});
	resetBoard();
	moves = 0;
}

(init)();

cards.forEach(card => card.addEventListener('click', flipCard));

