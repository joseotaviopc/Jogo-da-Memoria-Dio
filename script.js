const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let sum = 0;

shuffle();

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    if(checkForMath()) sum++;
    console.log(sum);
    setTimeout(() => {
        if(sum == 8) {
            alert('Parabéns!');
            resetBoard();
        }
    }, 1500);
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})


// verifica se os cards são iguais
function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return true;
    }

    unflipCards();
}


//desabilita o click caso acerto
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// caso não acerte, vira os cards de volta
function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// reseta os cards 1 e 2
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


// embaralha os cards

function shuffle() {
    setTimeout(() => {
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 16);
            card.style.order = randomPosition;
        });
    }, 1500);
}
