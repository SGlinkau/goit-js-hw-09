import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector("[data-start]");
const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");
const inputPicker = document.querySelector("#datetime-picker");
let timer;

const options = {
  altInput: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      start.disabled = false;
      Notiflix.Notify.success('Press the "start" to countdown.');
      inputPicker.dataset.time = selectedDate.getTime();
    } else {
      Notiflix.Notify.failure("Please choose a date in the future");
    };
  },
};

start.disabled = true;
flatpickr(inputPicker, options);



start.addEventListener("click", countdownTimer);

function countdownTimer() {
  start.disabled = true;
  const timeInMs = Number(inputPicker.dataset.time);

  if (timer) {
    clearInterval(timer);
  }

    timer = setInterval(() => {
    let currentTime = new Date().getTime();
    let timeLeft = timeInMs - currentTime;
    const convertedTime = convertMs(timeLeft);
    const { days, hours, minutes, seconds } = convertedTime;
    setTime(days, hours, minutes, seconds);

    if (timeLeft < 1000) {
      clearInterval(timer);
      Notiflix.Notify.success("READY");
    };
  }, 1000);

}
function setTime(days, hours, minutes, seconds) {

  daysField.innerHTML = addLeadingZero(days);
  hoursField.innerHTML =   addLeadingZero(hours) ;
  minutesField.innerHTML = addLeadingZero(minutes) ;
  secondsField.innerHTML = addLeadingZero(seconds) ;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return (value < 10) ?  value = "0" + value  :  value;
  };