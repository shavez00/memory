/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = false;
let time = 0;
let clockID;
let numOfMatches = 0;

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (let card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
        if (!clockOff && time === 0) {
            startClock();
            clockOff = false;
        }
    }
    if (clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
            console.log(numOfMatches);
        }
    }
    if (numOfMatches === 7) clearInterval(clockId);
});

function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
};

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
};

function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        numOfMatches++;
    } else {
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 2000);   
    }
};

function checkScore() {
    if (moves === 7 || moves === 14) {
        hideStar();
    }
};

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display != 'none') {
            star.style.display = 'none';
            break;
        }
    }
};

function startClock() {
    time = 0;
    clockId = setInterval (() => {
        time++;
        displayTime();
    }, 1000);
};

function displayTime() {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    const clock = document.querySelector('.clock');
    if (seconds < 10) {
        clock.innerHTML = minutes + ':0' +seconds;
    } else {
        clock.innerHTML = minutes+ ':' + seconds;
    }
};
