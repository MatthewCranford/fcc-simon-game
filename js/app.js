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
