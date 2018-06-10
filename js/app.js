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
let randomSequences = [];
function turn() {
    addRandomSequence();
    addRandomSequence();
    console.log(randomSequences);
    lightSequences(randomSequences);
    console.log('done');
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
    console.log(sequences);
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
    }
}

playerSequence = [];

document.querySelector('.simon').addEventListener('click', event => {
    userClick = event.target;
    if (userClick.getAttribute('data-sequence')) {
        console.log('valid');
    }
});

function updateCountDisplay() {
    count++;
    countDisplay = document.getElementById('simon__count-display');
    countDisplay.innerText = count;
}
