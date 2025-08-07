const STORAGE_KEYS = {
  ticketType: 'ticketType',
  basicCount: 'basicCount',
  seniorCount: 'seniorCount',
  totalPrice: 'totalPrice',
};

const PRICES = {
  basic: { 20: 20, 25: 25, 40: 40 },
  senior: { 20: 10, 25: 12.5, 40: 20 },
};

let currentTicketType = localStorage.getItem(STORAGE_KEYS.ticketType) || '20';
let currentBasicCount = parseInt(localStorage.getItem(STORAGE_KEYS.basicCount)) || 0;
let currentSeniorCount = parseInt(localStorage.getItem(STORAGE_KEYS.seniorCount)) || 0;

const totalPriceElem = document.querySelector('.js-price-total');
const ticketRadios = document.querySelectorAll('input[name="radio"]');
const plusButtons = document.querySelectorAll('.js-plus');
const minusButtons = document.querySelectorAll('.js-minus');

function calculateTotal() {
  const basicPrice = PRICES.basic[currentTicketType];
  const seniorPrice = PRICES.senior[currentTicketType];
  return (basicPrice * currentBasicCount + seniorPrice * currentSeniorCount).toFixed(0);
}

function updateTotalPrice() {
  const total = calculateTotal();
  totalPriceElem.textContent = total;
  localStorage.setItem(STORAGE_KEYS.totalPrice, total);
}

function getCurrentTicketType() {
  return currentTicketType;
}

const ticketCalc = () => {
  document.querySelector('.stapper__number--basic').textContent = currentBasicCount;
  document.querySelector('.stapper__number--senior').textContent = currentSeniorCount;

  ticketRadios.forEach(radio => {
    radio.checked = radio.value === currentTicketType;
  });

  function toggleMinusButtons() {
    minusButtons.forEach(button => {
      const counter = button.closest('.js-counter');
      if (counter.classList.contains('js-basic-counter')) {
        button.classList.toggle('disabled', currentBasicCount === 0);
      } else if (counter.classList.contains('js-senior-counter')) {
        button.classList.toggle('disabled', currentSeniorCount === 0);
      }
    });
  }

  ticketRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentTicketType = e.target.value;
      localStorage.setItem(STORAGE_KEYS.ticketType, currentTicketType);
      updateTotalPrice();
    });
  });

  plusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const counter = button.closest('.js-counter');
      const numberElem = counter.querySelector('.js-current-items');

      if (counter.classList.contains('js-basic-counter')) {
        currentBasicCount++;
        numberElem.textContent = currentBasicCount;
        localStorage.setItem(STORAGE_KEYS.basicCount, currentBasicCount);
      } else if (counter.classList.contains('js-senior-counter')) {
        currentSeniorCount++;
        numberElem.textContent = currentSeniorCount;
        localStorage.setItem(STORAGE_KEYS.seniorCount, currentSeniorCount);
      }

      updateTotalPrice();
      toggleMinusButtons();
    });
  });

  minusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const counter = button.closest('.js-counter');
      const numberElem = counter.querySelector('.js-current-items');

      if (counter.classList.contains('js-basic-counter') && currentBasicCount > 0) {
        currentBasicCount--;
        numberElem.textContent = currentBasicCount;
        localStorage.setItem(STORAGE_KEYS.basicCount, currentBasicCount);
      } else if (counter.classList.contains('js-senior-counter') && currentSeniorCount > 0) {
        currentSeniorCount--;
        numberElem.textContent = currentSeniorCount;
        localStorage.setItem(STORAGE_KEYS.seniorCount, currentSeniorCount);
      }

      updateTotalPrice();
      toggleMinusButtons();
    });
  });

  updateTotalPrice();
  toggleMinusButtons();
};

export {
  ticketCalc,
  updateTotalPrice,
  PRICES,
  getCurrentTicketType
};
