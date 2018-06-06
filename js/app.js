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
