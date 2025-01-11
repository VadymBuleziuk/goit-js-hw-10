import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const pageForm = document.querySelector('.form');

const submitFunction = event => {
  event.preventDefault();
  const radioName = document.querySelector('[name="state"]:checked');
  const radioMs = parseFloat(document.querySelector('[name="delay"]').value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioName.value === 'fulfilled') {
        resolve(radioMs);
      } else if (radioName.value === 'rejected') {
        reject(radioMs);
      }
    }, radioMs);
  });

  promise
    .then(delay => {
      console.log('Fulfilled');
      iziToast.show({
        color: '#59A10D',
        message: `✅ Fulfilled promise in ${delay} ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        position: 'topRight',
      });
    })
    .catch(delay => {
      console.log('Rejected');
      iziToast.show({
        color: '#FFBEBE',
        message: `❌ Rejected promise in ${delay} ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        position: 'topRight',
      });
    });
  pageForm.reset();
};
pageForm.addEventListener('submit', submitFunction);
