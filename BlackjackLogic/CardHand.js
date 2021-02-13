function CardHand(playerName) {
    this.player = playerName;
    this.cardsInHand = [];
    this.points = 0;
    this.aces = 0;
    this.status = true;

    this.calculatePoints = function() {
        this.aces = 0;
        this.points = 0;
        for (var i = 0; i < this.cardsInHand.length; i++) {
            if (this.cardsInHand[i].charAt(0) == "A") {
                this.aces += 1;
                continue;
            }
            let index = cardValues.indexOf(this.cardsInHand[i].charAt(0));
            let value;
            
            if (index >= 9 || this.cardsInHand[i].charAt(0) == 1) {
                value = 10;
            } else {
                value = index + 1;
            }
            this.points += value;
        }

        // Ace interaction. Add each ace to the hand as 11, if it busts, take away 10 and value the ace as 1.
        for (var i = 0; i < this.aces; i++) {
            console.log("Aces: " + this.aces);
            this.points += 11;
            if (this.points > max) {
                this.points -= 10;
            }
        }
        this.checkStatus();
    }

    this.addCardToHand = function() {
        let value = this.getRandomCardValue(cardValues);
        let suit = this.getRandomCardSuit(cardSuits);
        let card = value + suit;
        if (cardsUsed.includes(card)) {
            this.addCardToHand();
        }
        else {
            this.cardsInHand.push(card);
            this.calculatePoints();
            cardsUsed.push(card);
            console.log(this.cardsInHand);
            console.log(this.status);
            console.log(this.points);
        }
    }
    
    this.getRandomCardValue = function() {       
        let array = new Uint8Array(1);
        let bitsInVar = 8;
        window.crypto.getRandomValues(array);
        let scaleValue = (2 ** bitsInVar) / cardValues.length;
        array[0] = array[0] / scaleValue;
        return cardValues[array[0]];
    }
    
    this.getRandomCardSuit = function() {
        let array = new Uint8Array(1);
        let bitsInVar = 8;
        window.crypto.getRandomValues(array);
        let scaleValue = (2 ** bitsInVar) / cardSuits.length;
        array[0] = array[0] / scaleValue;
        return cardSuits[array[0]];
    }

    this.checkStatus = function() {
        if (this.points > max) {
            this.status = false;
            window.alert(this.player + " lost.");
            console.log(this.player + " is a bust!");
            newGameButton.disabled = false;
            hitButton.disabled = true;
            standButton.disabled = true;
            betSize.disabled = false;
        }
    }

    this.hit = function() {
        this.addCardToHand();
        return this.status;
    }

    this.dealerMoves = function(pointsToBeat) {
        let won;
        if (this.status) {
            while(this.points < pointsToBeat) {
                won = this.hit();
            }
            this.checkForWinner(pointsToBeat);
        }
    }

    this.checkForWinner = function(pointsToBeat) {
        if (this.points > pointsToBeat && this.status) {
            window.alert("User lost.");
            return true;
        } else if (this.points == pointsToBeat) {
            window.alert("It was a tie.");
            return true;
        }
        return false;
    }
}