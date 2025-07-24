export default function stepperPrice() {
  const MIN_VALUE = 0;
  const MAX_VALUE = 999;

  // Проверка на устройство Apple
  const isNotIphone = function () {
    return !/iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // Установка ширины input по количеству символов
  function inputWidth(input) {
    if (!input) return;
    if (isNotIphone()) {
      input.style.width = `${input.value.length + 1}ex`;
    } else {
      input.style.width = `${input.value.length + 2}ex`;
    }
  }

  // Обновление кнопки "-" в зависимости от значения
  function updateButtonsState(stepper) {
    const input = stepper.querySelector('.stepper__input');
    const btnDown = stepper.querySelector('.stepper__button--down');
    const value = parseInt(input.value) || 0;

    if (value <= MIN_VALUE) {
      btnDown.classList.add('stepper__button--disabled');
    } else {
      btnDown.classList.remove('stepper__button--disabled');
    }
  }

  // Делегирование нажатий на "+" и "-"
  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('stepper__button')) return;

    const stepper = e.target.closest('.stepper');
    const input = stepper.querySelector('.stepper__input');
    let value = parseInt(input.value) || 0;

    if (e.target.classList.contains('stepper__button--up')) {
      if (value < MAX_VALUE) value++;
    } else if (e.target.classList.contains('stepper__button--down')) {
      if (value > MIN_VALUE) value--;
    }

    input.value = value;
    updateButtonsState(stepper);
    inputWidth(input);
  });

  // Инициализация всех степперов
  document.querySelectorAll('.stepper__input').forEach(input => {
    // Проверка при потере фокуса
    input.addEventListener('blur', function () {
      let value = parseInt(input.value);

      if (isNaN(value) || value < MIN_VALUE) {
        value = MIN_VALUE;
      } else if (value > MAX_VALUE) {
        value = MAX_VALUE;
      }

      input.value = value;
      const stepper = input.closest('.stepper');
      updateButtonsState(stepper);
      inputWidth(input);
    });

    // Очистка ввода от недопустимых символов (дробей, букв и т.д.)
    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^\d]/g, '').slice(0, 3);
      inputWidth(this);
    });

    inputWidth(input); // Изначальная ширина
  });

  // Установка начального состояния кнопок
  document.querySelectorAll('.stepper').forEach(stepper => {
    updateButtonsState(stepper);
  });
}
