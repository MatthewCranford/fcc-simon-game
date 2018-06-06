const powerBtn = document.getElementById('simon__power-button');
let powerOn = false;

powerBtn.addEventListener('change', () => {
    if (powerBtn.checked === true) {
        powerOn = true;
    } else {
        powerOn = false;
    }
    console.log(powerOn);
});
