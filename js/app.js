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

// Globals
let pwrOn = false;
let strictOn = false;
let userInput = null;
let randomSequenceID = null;
let count = 0;
let playerMove = false;
let playerSequences = [];
let randomSequences = [];

document
    .querySelector('#simon__power-button')
    .addEventListener('change', togglePower);

function togglePower() {
    const pwrBtn = document.querySelector('#simon__power-button');
    if (pwrBtn.checked === true) {
        pwrOn = true;
    } else {
        pwrOn = false;
        prepareNewGame();
    }
    toggleDisplay();
}

function toggleDisplay() {
    document.querySelector('.simon__display').classList.toggle('hide');
}

document
    .querySelector('#simon__strict-button')
    .addEventListener('click', toggleStrict);

function toggleStrict() {
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
}

document
    .querySelector('#simon__start-button')
    .addEventListener('click', startGame);

function startGame() {
    if (pwrOn) {
        prepareNewGame();
        turn();
    }
}

function prepareNewGame() {
    count = 0;
    playerMove = false;
    playerSequences = [];
    randomSequences = [];
    displayCount();
}

function turn() {
    addRandomSequence();
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
        let sequence = sequences[index];

        // Delay before toggling light and playing sound
        setTimeout(() => {
            sequence.classList.toggle('simon__sequence--active');
            playSound(sequence);

            // Delay before toggling off light and calling next sequence
            setTimeout(() => {
                sequence.classList.toggle('simon__sequence--active');
                index++;
                lightSequence(index, sequences);
            }, 800);
        }, 800);
    } else {
        playerMove = true;
    }
}

function playSound(sequence) {
    let sequenceDataNum = sequence.getAttribute('data-sequence');

    switch (sequenceDataNum) {
        case '1':
            soundOne.play();
            break;
        case '2':
            soundTwo.play();
            break;
        case '3':
            soundThree.play();
            break;
        case '4':
            soundFour.play();
            break;
    }
}

document.querySelector('.simon').addEventListener('click', playerClick);

function playerClick(event) {
    let clickTarget = event.target;

    if (isPlayerClickValid(clickTarget)) {
        playerSequences.push(clickTarget);
        clickTarget.classList.toggle('simon__sequence--active');
        playSound(clickTarget);

        // Maintain click target with IIFE closure during timeout
        (function(closuredClickTarget) {
            setTimeout(() => {
                closuredClickTarget.classList.toggle('simon__sequence--active');
            }, 500);
        })(clickTarget);
        if (isPlayerSequenceValid()) {
            correctMove();
        } else {
            wrongMove();
        }
    }
}

function isPlayerClickValid(clickTarget) {
    return clickTarget.getAttribute('data-sequence') && playerMove;
}

function isPlayerSequenceValid() {
    for (sequence in playerSequences) {
        if (playerSequences[sequence] === randomSequences[sequence]) {
        } else {
            return false;
        }
    }
    return true;
}

function correctMove() {
    if (playerSequences.length === randomSequences.length) {
        addCount();
        if (count === 20) {
            victory();
        } else {
            prepareNewTurn();
        }
    }
}

function addCount() {
    count++;
    displayCount();
}

function displayCount() {
    countDisplay = document.getElementById('simon__count-display');
    countDisplay.innerText = count;
}

function victory() {
    playerMove = false;
    countDisplay = document.getElementById('simon__count-display');
    countDisplay.innerText = 'Win!';

    // Delay between victory and new game
    setTimeout(() => {
        prepareNewGame();
        turn();
    }, 3000);
}

function prepareNewTurn() {
    playerMove = false;
    playerSequences = [];
    turn();
}

function wrongMove() {
    let countDisplay = document.querySelector('#simon__count-display');
    let strictDisplay = document.querySelector('#simon__strict-display');
    playerMove = false;
    countDisplay.innerText = 'Wrong';
    if (strictOn) {
        strictDisplay.innerText = '';
    }

    // Delay between wrong move and next action
    setTimeout(() => {
        if (strictOn) {
            countDisplay.innerText = 0;
            strictDisplay.innerText = 's';
            prepareNewGame();
            turn();
        } else {
            countDisplay.innerText = count;
            repeatTurn();
        }
    }, 3000);
}

function repeatTurn() {
    playerSequences = [];
    lightSequences(randomSequences);
}
