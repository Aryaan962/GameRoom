var cards = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var cardsToValues = new Map();
var cardsUsed = [];
var dealerPoints;
var dealerCards = [];
var userPoints;
var userCards = [];

startGame(dealerPoints,userPoints);

function startGame(dealer, user) {
    cardsUsed = [];
    dealerPoints = 0;
    dealerCards = [];
    userPoints = 0;
    userCards = [];
    console.log(getRandomCard(userPoints, userCards));
    // console.log(userPoints);
    console.log(userCards);
}

function getRandomCard(player, playerCards) {
    var value = getRandomCardValue();
    var suit = getRandomCardSuit();
    var card = value + " of " + suit;
    cardsUsed.push(card);
    playerCards.push(card);
    player += getValue(card);
    
    return card;
}

function getRandomCardValue() {       
    var array = new Uint8Array(1);
    var bitsInVar = 8;
    window.crypto.getRandomValues(array);
    var scaleValue = (2 ** bitsInVar) / cards.length;
    array[0] = array[0] / scaleValue;
    return cards[array[0]];
}

function getRandomCardSuit() {
    var array = new Uint8Array(1);
    var bitsInVar = 8;
    window.crypto.getRandomValues(array);
    var scaleValue = (2 ** bitsInVar) / suits.length;
    array[0] = array[0] / scaleValue;
    return suits[array[0]];
}

function getValue(card) {
    card = card.split(" ");
    var index = cards.indexOf(card[0]);
    var value;
    if (index >= 9) {
        value = 10;
    } else {
        value = index + 1;
    }
    console.log(value);
}