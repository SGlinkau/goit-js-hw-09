import Notiflix from 'notiflix';

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  let delayMs = Number(delay.value);
  const stepMs = Number(step.value);
  const amountNr = Number(amount.value);

  if (delayMs >= 0 && stepMs >= 0 && amountNr > 0) {

    for (let i = 1; i <= amountNr; i++) {

      createPromise(i, delayMs)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delayMs += Number(step.value);
    }
  } else {
    Notiflix.Notify.failure(`❌ select values ​​above 0 `);
  };

  event.currentTarget.reset();
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({position,delay});
      } else {
        // Reject
        reject({position,delay});
      }
    }, delay))
};