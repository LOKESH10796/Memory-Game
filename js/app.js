/*
 * Create a list that holds all of your cards
 */

const cards = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bicycle"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

function generateCards(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function initGame() {
  let deck = document.querySelector(".deck");
  const cardHTML = shuffle(cards).map(function (card) {
    return generateCards(card);
  });
  deck.innerHTML = cardHTML.join("");
}
initGame();

const allCards = document.querySelectorAll(".card");
let openCards = [];
let onFirstclk = 0;
allCards.forEach(function (card) {
  card.addEventListener("click", function (e) {
    if (!card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      openCards.push(card);
      card.classList.add("open", "show");
      if (onFirstclk === 0) {
        startTimer();
      }

      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add("match");
          openCards[0].classList.add("open");
          openCards[0].classList.add("show");

          openCards[1].classList.add("match");
          openCards[1].classList.add("open");
          openCards[1].classList.add("show");
          openCards = [];
          matchedCards();
          addMove();
        } else {
          setTimeout(function () {
            openCards.forEach(function (card) {
              card.classList.remove("open", "show");
            });
            openCards = [];

            addMove();
          }, 250);
        }
      }
    }
  });
});

let timer = document.querySelector(".timer");
let second = 0,
  minute = 0;

function startTimer() {
  onFirstclk = 1;
  interval = setInterval(function () {
    timer.innerHTML = minute + " mins " + second + " secs";
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

function stopTimer() {
  timer.innerHTML = minute + " mins " + second + " secs";
  clearInterval(interval);
  popUp();
}

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  rating();
}

const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function rating() {
  if (moves < 10) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 15) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function restartGame() {
  document.location.reload(true);
});

function matchedCards() {
  let totalCards = document.getElementsByClassName("match");
  if (totalCards.length == 16) {
    stopTimer();
  }
}

function popUp() {
  const modal = document.querySelector(".modal-background");
  modal.classList.toggle("hide");
  document.getElementById("modal-moves").innerHTML = moves;
  document.getElementById("modal-time").innerHTML = timer.innerHTML;
  document.getElementById("modal-stars").innerHTML = starsContainer.innerHTML;
}