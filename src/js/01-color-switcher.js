function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
stopBtn.disabled = true;

startBtn.addEventListener('click', handleStartBtnClick);
stopBtn.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    body.style.backgroundColor = getRandomHexColor();
    changeColor = setInterval(() => {
        const bodyColor = getRandomHexColor();
        body.style.backgroundColor = bodyColor;
    }, 1000);
};

function handleStopBtnClick() { 
    clearInterval(changeColor);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}