// Game sounds
const soundOne = new Audio(
    'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
);
const soundTwo = new Audio(
    'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'
);
const soundThree = new Audio(
    'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
);
const soundFour = new Audio(
    'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
);

const pwrBtn = document.getElementById('simon__power-button');
let pwrOn = false;
let strictOn = false;
let userInput = null;
let randomSequenceID = null;
let count = 0;
let playerMove = false;
let playerSequences = [];
let randomSequences = [];

pwrBtn.addEventListener('change', () => {
    if (pwrBtn.checked === true) {
        pwrOn = true;
    } else {
        pwrOn = false;
    }
    showDisplay();
});

function showDisplay() {
    document.querySelector('.simon__display').classList.toggle('hide');
}

document
    .querySelector('#simon__strict-button')
    .addEventListener('click', () => {
        if (pwrOn) {
            strictDisplay = document.querySelector('#simon__strict-display');
            if (strictOn) {
                strictOn = false;
                strictDisplay.innerHTML = '';
            } else {
                strictOn = true;
                strictDisplay.innerHTML = 's';
            }
        }
    });

document.querySelector('#simon__start-button').addEventListener('click', () => {
    if (pwrOn) {
        initGame();
    }
});

function initGame() {
    count = 0;
    updateCountDisplay();
    turn();
}

function turn() {
    addRandomSequence();
    console.log('Random Sequence', randomSequences);
    lightSequences(randomSequences);
}

function addRandomSequence() {
    randomSequenceID = Math.floor(Math.random() * Math.floor(4) + 1);
    const randomSequence = document.querySelector(
        `[data-sequence="${randomSequenceID}"]`
    );
    randomSequences.push(randomSequence);
}

function lightSequences(sequences) {
    let startIndex = 0;
    lightSequence(startIndex, sequences);
}

function lightSequence(index, sequences) {
    if (index !== sequences.length) {
        setTimeout(() => {
            sequences[index].classList.toggle('simon__sequence--active');
            setTimeout(() => {
                sequences[index].classList.toggle('simon__sequence--active');
                index++;
                lightSequence(index, sequences);
            }, 1000);
        }, 1000);
    } else {
        // getPlayerSequence();
        playerMove = true;
    }
}

document.querySelector('.simon').addEventListener('click', event => {
    userClick = event.target;
    if (userClick.getAttribute('data-sequence') && playerMove) {
        playerSequences.push(userClick);
        console.log('Player Sequence', playerSequences);
        if (evaluatePlayerSequence()) {
            console.log('Match!');
            if (playerSequences.length === randomSequences.length) {
                console.log('Next Sequence!');
                updateCountDisplay();
                prepareNextTurn();
            }
        } else {
            console.log('Miss!');
            resetGame();
        }
    }
});

function evaluatePlayerSequence() {
    for (sequence in playerSequences) {
        if (playerSequences[sequence] === randomSequences[sequence]) {
        } else {
            return false;
        }
    }
    return true;
}

function updateCountDisplay() {
    count++;
    countDisplay = document.getElementById('simon__count-display');
    countDisplay.innerText = count;
}

function prepareNextTurn() {
    playerMove = false;
    playerSequences = [];
    turn();
}

function resetGame() {
    playerMove = false;
    playerSequences = [];
    randomSequences = [];
    Ad;
    turn();
}

function resetCount() {
    count = 0;
    displayCount();
}
