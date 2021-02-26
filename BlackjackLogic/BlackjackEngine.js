const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardSuits = ["S", "H", "C", "D"];
let max = 21;
let cardsUsed;
let user;
let dealer;

let userCards = document.createElement("p");
let dealerCards = document.createElement("p");
let winnerMessage = document.createElement("img");
let userPoints = document.createElement("p");
let dealerPoints = document.createElement("p");

let newGameButton = document.getElementById("newGame");
let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");
let betSize = document.getElementById("betSize");

startButtons();

function newGame() {
    clearHTML();
    console.clear();
    cardsUsed = [];
    user = new CardHand("User");
    dealer = new CardHand("Dealer");
    if (betSize.value > 0.01) {
        startGame();
    } else {
        window.alert("You must increase your bet or you forgot to input your bet.");
    }
}

function startGame() {
    user.addCardToHand();
    dealer.addCardToHand();
    user.addCardToHand();
    dealer.addCardToHand();

    showDealerCardsCovered();
    showUserCards();

    showDealerPointsCovered();
    showUserPoints();

    gameButtons();
}

function showDealerCardsCovered() {
    dealerCards.style.position = "absolute";
    dealerCards.style.left = "50%";
    dealerCards.style.transform = "translate(-50%)";
    dealerCards.innerHTML = dealer.cardsInHand[0];
    document.getElementById("ovalTable").appendChild(dealerCards);
}

function showDealerCardsUncovered() {
    dealerCards.style.position = "absolute";
    dealerCards.style.left = "50%";
    dealerCards.style.transform = "translate(-50%)";
    dealerCards.innerHTML = dealer.cardsInHand;
    document.getElementById("ovalTable").appendChild(dealerCards);
}

function showUserCards() {
    userCards.style.position = "absolute";
    userCards.style.left = "50%";
    userCards.style.bottom = "0px"
    userCards.style.transform = "translate(-50%)";
    userCards.innerHTML = user.cardsInHand;
    document.getElementById("ovalTable").appendChild(userCards);
}

function showDealerPointsCovered() {
    dealerPoints.style.position = "absolute";
    dealerPoints.style.left = "10px";
    dealerPoints.style.bottom = "0px";
    dealerPoints.innerHTML = "Dealer Points: ?";
    document.getElementById("main").appendChild(dealerPoints);
}

function showDealerPointsUncovered() {
    dealerPoints.innerHTML = "Dealer Points: " + dealer.points;
}

function showUserPoints() {
    userPoints.style.position = "absolute";
    userPoints.style.right = "10px";
    userPoints.style.bottom = "0px";
    userPoints.innerHTML = "<b>Your Points: " + user.points + "</b>";
    document.getElementById("main").appendChild(userPoints);
}

function hit() {
    user.addCardToHand();
    showUserCards();
    showUserPoints();
    if (!user.checkStatus()) {
        displayWinner();
        startButtons();
    }
}

function stand() {
    while (dealer.points < 17 || dealer.points < user.points) {
        dealer.addCardToHand();
    }

    showDealerPointsUncovered();
    showDealerCardsUncovered();
    displayWinner();

    startButtons();
}

function displayWinner() {
    document.getElementById("ovalTable");
    winnerMessage.style.position = "absolute";
    winnerMessage.style.left = "50%";
    winnerMessage.style.top = "50%"
    winnerMessage.style.transform = "translate(-50%, -50%)";
    winnerMessage.style.width = "500px";
    document.getElementById("ovalTable").appendChild(winnerMessage);
    if (!dealer.checkStatus()) {
        winnerMessage.src = "Images/YouWin.png";
    } else {
        if (!user.checkStatus() || dealer.points > user.points) {
            winnerMessage.src = "Images/DealerWins.png";
        } else {
            winnerMessage.src = "Images/YouWin.png";
        } 
    }
}

function startButtons() {
    newGameButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
    betSize.disabled = false;
}

function gameButtons() {
    newGameButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    betSize.disabled = true;
}

function clearHTML() {
    userCards.innerHTML = "";
    dealerCards.innerHTML = "";
    winnerMessage.src = "";
    userPoints.innerHTML = "";
    dealerPoints.innerHTML = "";
}