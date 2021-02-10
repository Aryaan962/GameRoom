const cardValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const cardSuits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let cardsUsed = [];

start();

function start() {
    var user = new CardHand();
    console.log(user.addCardToHand());
    console.log(user.addCardToHand());
}
