const cardValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const cardSuits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let max = 21;
let cardsUsed;
let user;
let dealer;

newGame();

function newGame() {
    cardsUsed = [];
    user = new CardHand();
    dealer = new CardHand();
    startGame();
}

function startGame() {
    user.addCardToHand();
    dealer.addCardToHand();
    user.addCardToHand();
    dealer.addCardToHand();
}


