function CardHand() {
    this.cardsInHand = [];
    this.points = 0;
    this.aces = 0;
    this.status = true;

    this.calculatePoints = function() {
        this.aces = 0;
        this.points = 0;
        for (var i = 0; i < this.cardsInHand.length; i++) {
            if (this.cardsInHand[i][0] == "Ace") {
                this.aces += 1;
                continue;
            }
            let index = cardValues.indexOf(this.cardsInHand[i][0]);
            let value;
            
            if (index >= 9) {
                value = 10;
            } else {
                value = index + 1;
            }
            this.points += value;
        }

        // Ace interaction. Add each ace to the hand as 11, if it busts, take away 10 and value the ace as 1.
        for (var i = 0; i < this.aces; i++) {
            this.points += 11;
            if (this.points > max) {
                this.points -= 10;
            }
        }
        if (this.points > max) {
            this.status = false;
        }
    }

    this.addCardToHand = function() {
        let value = this.getRandomCardValue(cardValues);
        let suit = this.getRandomCardSuit(cardSuits);
        let card = value + " of " + suit;
        if (cardsUsed.includes(card)) {
            this.addCardToHand();
            console.log("dup");
        }
        else {
            this.cardsInHand.push(card.split(" "));
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
        if (!this.status) {

        }
    }

    this.hit = function() {
        this.addCardToHand();
        this.checkStatus();
    }
}