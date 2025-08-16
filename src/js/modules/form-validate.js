const formValidate = () => {
  const form = document.getElementById('bookingForm');

  // Установка минимальной даты (сегодня)
  const dateInput = document.getElementById('datePicker');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  // Все поля
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const phoneInput = document.getElementById('userPhone');
  const timeInput = document.querySelector('input[name="user-time"]');

  // Функции проверок
  const validators = {
    userName: () => {
      const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{3,15}$/;
      return nameRegex.test(nameInput.value.trim());
    },
    userEmail: () => {
      const emailRegex = /^[a-zA-Z0-9_-]{3,15}@([a-z]{4,})\.([a-z]{2,})$/;
      return emailRegex.test(emailInput.value.trim());
    },
    userPhone: () => {
      const phoneDigits = phoneInput.value.replace(/[\s-]/g, '');
      const phoneRegex = /^(\d[\d\s-]*){10}$/;
      return phoneRegex.test(phoneInput.value) && phoneDigits.length === 10;
    },
    userDate: () => {
      return dateInput.value >= today;
    },
    userTime: () => {
      const [hours, minutes] = timeInput.value.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const minMinutes = 9 * 60;
      const maxMinutes = 18 * 60;
      return (
        !isNaN(totalMinutes) &&
        totalMinutes >= minMinutes &&
        totalMinutes <= maxMinutes &&
        totalMinutes % 30 === 0
      );
    },
  };

  // Тексты ошибок
  const errorMessages = {
    userName: 'Имя должно содержать 3–15 букв (русские или латинские) и пробелы.',
    userEmail: 'Email должен быть в формате username@example.com',
    userPhone: 'Телефон должен содержать 10 цифр, можно с пробелами или дефисами.',
    userDate: 'Нельзя выбрать прошедшую дату.',
    userTime: 'Выберите время от 09:00 до 18:00 с шагом 30 минут.',
  };

  // Live-валидация
  nameInput.addEventListener('input', () => handleValidation(nameInput, 'nameError', 'userName'));
  emailInput.addEventListener('input', () => handleValidation(emailInput, 'emailError', 'userEmail'));
  phoneInput.addEventListener('input', () => handleValidation(phoneInput, 'phoneError', 'userPhone'));
  dateInput.addEventListener('input', () => handleValidation(dateInput, 'dateError', 'userDate'));
  timeInput.addEventListener('input', () => handleValidation(timeInput, 'timeError', 'userTime'));

  // Обработка отправки формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Проверка всех полей
    if (!validators.userName()) {
      showError(nameInput, 'nameError', errorMessages.userName);
      isValid = false;
    }
    if (!validators.userEmail()) {
      showError(emailInput, 'emailError', errorMessages.userEmail);
      isValid = false;
    }
    if (!validators.userPhone()) {
      showError(phoneInput, 'phoneError', errorMessages.userPhone);
      isValid = false;
    }
    if (!validators.userDate()) {
      showError(dateInput, 'dateError', errorMessages.userDate);
      isValid = false;
    }
    if (!validators.userTime()) {
      showError(timeInput, 'timeError', errorMessages.userTime);
      isValid = false;
    }

    if (isValid) {
      alert('Форма успешно отправлена!');
      form.reset();
      clearErrors();
    }
  });

  // Проверка одного поля
  function handleValidation(input, errorId, fieldKey) {
    if (!validators[fieldKey]()) {
      showError(input, errorId, errorMessages[fieldKey]);
    } else {
      clearFieldError(input, errorId);
    }
  }

  // Показать ошибку
  function showError(input, errorId, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  // Убрать ошибку, добавить класс valid
  function clearFieldError(input, errorId) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  // Очистить все ошибки
  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('.invalid, .valid').forEach(el => {
      el.classList.remove('invalid');
      el.classList.remove('valid');
    });
  }
};

export {
  formValidate
};
