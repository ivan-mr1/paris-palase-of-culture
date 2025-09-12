import { updateTotalPrice, PRICES, getCurrentTicketType } from './ticketsCalc';

const modalCalcTickets = () => {
  const basicStepper = document.querySelector(
    '.stappers-booking__basic .js-counter',
  );
  const seniorStepper = document.querySelector(
    '.stappers-booking__senior .js-counter',
  );

  const basicCountElem = basicStepper.querySelector('.js-current-items');
  const seniorCountElem = seniorStepper.querySelector('.js-current-items');

  const basicSectionElem = document.querySelector(
    '.js-basic-counter .js-current-items',
  );
  const seniorSectionElem = document.querySelector(
    '.js-senior-counter .js-current-items',
  );

  const basicModalCountDisplay = document.querySelector('.js-calc-basic-modal');
  const seniorModalCountDisplay = document.querySelector(
    '.js-calc-senior-modal',
  );

  const basicModalPrice = document.querySelector('.js-price-basic-modal');
  const seniorModalPrice = document.querySelector('.js-price-senior-modal');

  const totalPriceModalElem = document.querySelector('.js-price-total-modal');

  function toggleMinusButtons(stepper) {
    const minusBtn = stepper.querySelector('.js-minus');
    const count = parseInt(
      stepper.querySelector('.js-current-items').textContent,
      10,
    );
    minusBtn.classList.toggle('disabled', count <= 0);
  }

  function syncFromSection() {
    if (!basicSectionElem || !seniorSectionElem) {
      return;
    }

    basicCountElem.textContent = basicSectionElem.textContent;
    seniorCountElem.textContent = seniorSectionElem.textContent;

    toggleMinusButtons(basicStepper);
    toggleMinusButtons(seniorStepper);

    updateModalDisplays();
  }

  function syncToSection() {
    if (!basicSectionElem || !seniorSectionElem) {
      return;
    }

    basicSectionElem.textContent = basicCountElem.textContent;
    seniorSectionElem.textContent = seniorCountElem.textContent;
  }

  function updateModalDisplays() {
    const basicCount = parseInt(basicCountElem.textContent, 10);
    const seniorCount = parseInt(seniorCountElem.textContent, 10);

    const ticketType = getCurrentTicketType();

    const basicPrice = PRICES.basic[ticketType];
    const seniorPrice = PRICES.senior[ticketType];

    const basicTotalPrice = basicCount * basicPrice;
    const seniorTotalPrice = seniorCount * seniorPrice;

    if (basicModalCountDisplay) {
      basicModalCountDisplay.textContent = basicCount;
    }
    if (seniorModalCountDisplay) {
      seniorModalCountDisplay.textContent = seniorCount;
    }

    if (basicModalPrice) {
      basicModalPrice.textContent = basicTotalPrice.toFixed(0) + ' €';
    }
    if (seniorModalPrice) {
      seniorModalPrice.textContent = seniorTotalPrice.toFixed(0) + ' €';
    }

    if (totalPriceModalElem) {
      const totalPrice = basicTotalPrice + seniorTotalPrice;
      totalPriceModalElem.textContent = totalPrice.toFixed(0);
    }
  }

  function stepperListeners(stepper, countElem) {
    const plusBtn = stepper.querySelector('.js-plus');
    const minusBtn = stepper.querySelector('.js-minus');

    plusBtn.addEventListener('click', () => {
      let count = parseInt(countElem.textContent, 10);
      count++;
      countElem.textContent = count;
      toggleMinusButtons(stepper);
      syncToSection();
      updateTotalPrice();
      updateModalDisplays();
    });

    minusBtn.addEventListener('click', () => {
      let count = parseInt(countElem.textContent, 10);
      if (count > 0) {
        count--;
        countElem.textContent = count;
        toggleMinusButtons(stepper);
        syncToSection();
        updateTotalPrice();
        updateModalDisplays();
      }
    });
  }

  const openModalBtn = document.querySelector('.amount__btn');
  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      syncFromSection();
    });
  }

  stepperListeners(basicStepper, basicCountElem);
  stepperListeners(seniorStepper, seniorCountElem);

  updateModalDisplays();
};

export { modalCalcTickets };
