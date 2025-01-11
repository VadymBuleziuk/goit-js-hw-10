import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const dateInput = document.querySelector('#datetime-picker');
const dataButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
dataButton.disabled = true;

console.dir(dateInput);
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: '#ef4040',
        titleColor: '#ffffff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
      });
      dataButton.disabled = true;
      return;
    }
    dataButton.disabled = false;
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
  },
};
flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let intervalId;
const addLeadingZero = value => String(value).padStart(2, '0');
const start = () => {
  intervalId = setInterval(() => {
    dataButton.disabled = true;
    dateInput.disabled = true;
    const diff = userSelectedDate - Date.now();
    if (diff < 0) {
      clearInterval(intervalId);
      dateInput.disabled = false;
      return;
    }
    const timeComponents = convertMs(diff);
    dataDays.textContent = addLeadingZero(timeComponents.days);
    dataHours.textContent = addLeadingZero(timeComponents.hours);
    dataMinutes.textContent = addLeadingZero(timeComponents.minutes);
    dataSeconds.textContent = addLeadingZero(timeComponents.seconds);
  }, 1000);
};
dataButton.addEventListener('click', start);
