const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardSuits = ["S", "H", "C", "D"];
let max = 21;
let cardsUsed;
let user;
let dealer;

let coveredCard = document.createElement("img");
let dealerCardCovered = document.createElement("img");
let dealerCardUncovered = document.createElement("img");
let userCards = document.createElement("p");
let winnerMessage = document.createElement("img");
let dealerPoints = document.createElement("p");
let userPoints = document.createElement("p");

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
    dealerCardCovered.src = "Images/PlayingCards/" + dealer.cardsInHand[0] + ".png";
    dealerCardCovered.style.width = "75px";
    document.getElementById("dealerCards").append(dealerCardCovered);

    coveredCard.src = "Images/PlayingCards/Covered.png";
    coveredCard.style.height = "110px";
    document.getElementById("dealerCards").append(coveredCard);
}

function showDealerCardsUncovered() {
    let dealerCardsNode = document.getElementById("dealerCards");
    while (dealerCardsNode.firstChild) {
        dealerCardsNode.removeChild(dealerCardsNode.lastChild);
    }
    for (var i = 0; i < dealer.cardsInHand.length; i++) {
        dealerCardUncovered = document.createElement("img");
        dealerCardUncovered.src = "Images/PlayingCards/" + dealer.cardsInHand[i] + ".png";
        dealerCardUncovered.style.width = "75px";
        document.getElementById("dealerCards").append(dealerCardUncovered);
    }
}

function showUserCards() {
    let userCardsNode = document.getElementById("userCards");
    while (userCardsNode.firstChild) {
        userCardsNode.removeChild(userCardsNode.lastChild);
    }
    for (var i = 0; i < user.cardsInHand.length; i++) {
        userCards = document.createElement("img");
        userCards.src = "Images/PlayingCards/" + user.cardsInHand[i] + ".png";
        userCards.style.width = "75px";
        document.getElementById("userCards").append(userCards);
    }
}

function showDealerPointsCovered() {
    dealerPoints.style.position = "absolute";
    dealerPoints.style.left = "10px";
    dealerPoints.style.bottom = "0px";
    dealerPoints.innerHTML = "Dealer Points: ?";
    document.getElementById("main").append(dealerPoints);
}

function showDealerPointsUncovered() {
    dealerPoints.innerHTML = "Dealer Points: " + dealer.points;
}

function showUserPoints() {
    userPoints.style.position = "absolute";
    userPoints.style.right = "10px";
    userPoints.style.bottom = "0px";
    userPoints.innerHTML = "<b>Your Points: " + user.points + "</b>";
    document.getElementById("main").append(userPoints);
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
    while (dealer.points < 17 && dealer.points < user.points) {
        dealer.addCardToHand();
    }

    coveredCard.src = "";
    dealerCardCovered.src = "";

    showDealerPointsUncovered();
    showDealerCardsUncovered();
    displayWinner();

    startButtons();
}

function displayWinner() {
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
        } else if (dealer.points == user.points) {
            winnerMessage.src = "Images/Push.png";
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
    let dealerCardsNode = document.getElementById("dealerCards");
    while (dealerCardsNode.firstChild) {
        dealerCardsNode.removeChild(dealerCardsNode.lastChild);
    }

    let userCardsNode = document.getElementById("userCards");
    while (userCardsNode.firstChild) {
        userCardsNode.removeChild(userCardsNode.lastChild);
    }

    winnerMessage.src = "";
    userPoints.innerHTML = "";
    dealerPoints.innerHTML = "";
}