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
    turn();
}

function turn() {
    console.log('turn');
    let randomSequence = getRandomSequence();
    temporarilyLightSequence(randomSequence);
}

function getRandomSequence() {
    randomSequenceID = Math.floor(Math.random() * Math.floor(4) + 1);
    const randomSequence = document.querySelector(
        `[data-sequence="${randomSequenceID}"]`
    );
    return randomSequence;
}

function temporarilyLightSequence(sequence) {
    sequence.classList.toggle('simon__sequence--active');
    setTimeout(() => {
        sequence.classList.toggle('simon__sequence--active');
    }, 1000);
}

document.querySelector('.simon').addEventListener('click', event => {
    userInput = event.target;
    if (
        parseInt(userInput.getAttribute('data-sequence')) === randomSequenceID
    ) {
        console.log('valid');
        updateCountDisplay();
        // !!!TODO: Reset variables
    }
});

function updateCountDisplay() {
    count++;
    countDisplay = document.getElementById('simon__count-display');
    countDisplay.innerText = count;
}
