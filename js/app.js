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
        initGame();
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
        turn();
    }
});

function initGame() {
    count = 0;
    playerMove = false;
    playerSequences = [];
    randomSequences = [];
    displayCount();
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
    clickTarget = event.target;
    if (clickTarget.getAttribute('data-sequence') && playerMove) {
        playerSequences.push(clickTarget);
        console.log('Player Sequence', playerSequences);
        if (evaluatePlayerSequence()) {
            console.log('Match!');
            if (playerSequences.length === randomSequences.length) {
                console.log('Next Sequence!');
                addCount();
                prepareNewTurn();
            }
        } else {
            console.log('Miss!');
            repeatTurn();
            // resetGame();
            // turn();
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

function addCount() {
    count++;
    displayCount();
}

function displayCount() {
    countDisplay = document.getElementById('simon__count-display');
    countDisplay.innerText = count;
}

function prepareNewTurn() {
    playerMove = false;
    playerSequences = [];
    turn();
}

function repeatTurn() {
    playerMove = false;
    playerSequences = [];
    lightSequences(randomSequences);
}

document
    .querySelector('.simon')
    .addEventListener('mousedown', togglePlayerClick);

document.querySelector('.simon').addEventListener('mouseup', togglePlayerClick);

function togglePlayerClick(event) {
    mouseDownTarget = event.target;
    if (mouseDownTarget.getAttribute('data-sequence') && playerMove) {
        console.log('hey');
        mouseDownTarget.classList.toggle('simon__sequence--active');
    }
}
