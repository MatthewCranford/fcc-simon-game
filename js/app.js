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

const powerBtn = document.getElementById('simon__power-button');
let powerOn = false;

powerBtn.addEventListener('change', () => {
    if (powerBtn.checked === true) {
        powerOn = true;
    } else {
        powerOn = false;
    }
    showDisplay();
});

function showDisplay() {
    display = document.querySelector('.simon__display');
    display.classList.toggle('hide');
}

strictBtn = document.querySelector('#simon__strict-button');
strictOn = false;

strictBtn.addEventListener('click', () => {
    if (powerOn) {
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

startBtn = document.querySelector('#simon__start-button');

startBtn.addEventListener('click', () => {
    if (powerOn) {
        // Start game
        initGame();
    }
});

function initGame() {
    let randomSequence = getRandomSequence();
    console.log(randomSequence);

    // Light up random color
    lightSequence(randomSequence);
    // Increase count
}

function getRandomSequence() {
    const randomNumber = Math.floor(Math.random() * Math.floor(4) + 1);
    const randomSequence = document.querySelector(
        `[data-sequence="${randomNumber}"]`
    );
    return randomSequence;
}

function temporarilyLightSequence(sequence) {
    sequence.classList.toggle('simon__sequence--active');
    setTimeout(() => {
        sequence.classList.toggle('simon__sequence--active');
    }, 1000);
}

