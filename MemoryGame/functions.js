const cards = document.querySelectorAll('.cards');

let hasFlippedCard = false, lockBoard, firstCard, secCard, countDown = 0;

var userInput = prompt("Please enter an even number between 4 and 20");
countDown = userInput;

function flipCard() {
	if (lockBoard || this === firstCard) return;
	if (this === firstCard) return;

	this.classList.toggle('flip');

	//Stops the user from flipping the same card twice
	if (!hasFlippedCard) {
		// first click
		hasFlippedCard = true, firstCard = this;

		return;
	}

	// second click
	hasFlippedCard = false, secCard = this;

	checkMatch();

	//Telling the user that they have completed the game
	if (countDown === 0) {
		alert("YOU DID IT! NICE GAME!");
		location.reload();
	}
}

function removeFlip() {
	firstCard.classList.remove('flip');
	secCard.classList.remove('flip');

	resetBoard();
}

//To return the cards back around after there is no match
function unFlipCards() {
	lockBoard = true;
	setTimeout(removeFlip, 1500);
}

//To see if the cards match
function checkMatch() {
	// do cards match?
	if (firstCard.dataset.framework === secCard.dataset.framework) {
		//it's a match!!
		disableCards();
		countDown -= 2;
	} else {
		//not a match
		unFlipCards();
	}
}

//Prevent any interaction after the cards match
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secCard.removeEventListener('click', flipCard);

	resetBoard();
}

//To make sure that not more than 2 cards are chosen
function resetBoard() {
	[hasFlippedCard, lockBoard, firstCard, secCard] = [false, false, null, null];
}

//To randomise the positions of the cards on the board
(function shuffle() {
	userInput = userInput >= 4 && userInput <= 20 && userInput % 2 === 0 ? userInput : 4;
	for (var k = 0; k < cards.length - userInput; k++)
		cards[k].style.display = "none";
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 20);
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));
