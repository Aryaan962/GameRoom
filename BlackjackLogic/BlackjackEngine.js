const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardSuits = ["S", "H", "C", "D"];
let max = 21;
let cardsUsed;
let user;
let dealer;

function newGame() {
    cardsUsed = [];
    user = new CardHand();
    dealer = new CardHand();
    console.log("hi");
    startGame();
}

function startGame() {
    user.addCardToHand();
    dealer.addCardToHand();
    user.addCardToHand();
    dealer.addCardToHand();
    updateCards();
}

function updateCards() {
    document.write('<img src="http://deckofcardsapi.com/static/img/AS.png"/>');
}
