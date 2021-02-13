const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardSuits = ["S", "H", "C", "D"];
let max = 21;
let cardsUsed;
let user;
let dealer;

let newGameButton = document.getElementById("newGame");
let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");
let forfeitButton = document.getElementById("forfeit");
let betSize = document.getElementById("betSize");

newGameButton.disabled = false;
hitButton.disabled = true;
standButton.disabled = true;
forfeitButton.disabled = true;
betSize.disabled = false;

function newGame() {
    console.clear();
    //if (checkBetSize()) {
        cardsUsed = [];
        user = new CardHand("User");
        dealer = new CardHand("Dealer");
        startGame();
    //}
}

function startGame() {
    user.addCardToHand();
    dealer.addCardToHand();
    user.addCardToHand();
    dealer.addCardToHand();
    updatePage();

    // update buttons
    newGameButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    forfeitButton.disabled = false;
    betSize.disabled = true;
}

function updatePage() {    
    showUserCards();
    showDealerCards();
}

function showUserCards() {
    document.getElementById("ovalTable");
    var node = document.createElement("p");
    node.style.position = "absolute";
    node.style.left = "50%";
    node.style.transform = "translate(-70%, -50%)";
    node.style.bottom = "0px"
    node.innerHTML = user.cardsInHand;
    document.getElementById("ovalTable").appendChild(node);
}

function showDealerCards() {
    document.getElementById("ovalTable");
    var node = document.createElement("p");
    node.style.position = "absolute";
    node.style.left = "50%";
    node.style.transform = "translate(-70%, -50%)";
    node.style.top = "20px";
    node.innerHTML = dealer.cardsInHand;
    document.getElementById("ovalTable").appendChild(node);
}

function hit() {
    if (!user.hit()) {
        newGameButton.disabled = false;
        hitButton.disabled = true;
        standButton.disabled = true;
        betSize.disabled = false;
    }
}

function stand() {
    newGameButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
    forfeitButton.disabled = true;
    betSize.disabled = false;
    dealer.dealerMoves(user.points);
}

function forfeit() {
    console.clear();
    newGameButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
    forfeitButton.disabled = true;
    betSize.disabled = false;
}

function checkBetSize() {
    if (betSize.value < 0.01) {
        window.alert("You must increase your bet or you forgot to input your bet.");
        return false;
    } else {
        return true;
    }
}