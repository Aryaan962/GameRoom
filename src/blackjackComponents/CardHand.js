class CardHand {
    constructor(playerName) {
        this.name = playerName;
        this.cardsInHand = [];
        this.points = 0;
        this.aces = 0;
        this.status = true;
    }

    calculatePoints() {
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

        for (var i = 0; i < this.aces; i++) {
            this.points += 1;
        }

        for (var j = 0; j < this.aces; j++) {
            this.points += 10;
            if (this.points > max) {
                this.points -= 10;
            }
        }

        return this.points;
    }

    addCardToHand() {
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
        }
    }
    
    getRandomCardValue() {       
        let array = new Uint8Array(1);
        let bitsInVar = 8;
        window.crypto.getRandomValues(array);
        let scaleValue = (2 ** bitsInVar) / cardValues.length;
        array[0] = array[0] / scaleValue;
        return cardValues[array[0]];
    }
    
    getRandomCardSuit() {
        let array = new Uint8Array(1);
        let bitsInVar = 8;
        window.crypto.getRandomValues(array);
        let scaleValue = (2 ** bitsInVar) / cardSuits.length;
        array[0] = array[0] / scaleValue;
        return cardSuits[array[0]];
    }

    checkStatus() {
        if (this.points > max) {
            this.status = false;
        }
        return this.status;
    }
}
