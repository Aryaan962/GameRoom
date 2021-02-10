function CardHand() {
    this.cardsInHand = [];
    this.points = 0;
    this.aces = 0;

    this.calculatePoints = function() {
        this.aces = 0;
        this.points = 0;
        for (var i = 0; i < this.cardsInHand.length; i++) {
            if (this.cardsInHand[i][0] == "Ace") {
                this.aces += 1;
                continue;
            }
            var index = cardValues.indexOf(this.cardsInHand[i][0]);
            let value;
            
            if (index >= 9) {
                value = 10;
            } else {
                value = index + 1;
            }
            this.points += value;
        }
        // Have to add in ace interaction
    }

    this.addCardToHand = function() {
        let value = this.getRandomCardValue(cardValues);
        let suit = this.getRandomCardSuit(cardSuits);
        let card = value + " of " + suit;
        cardsUsed.push(card);
        this.cardsInHand.push(card.split(" "));
        this.calculatePoints();
        return this.points;
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
}