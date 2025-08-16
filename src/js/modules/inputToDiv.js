const inputToDiv = () => {
  const dateInput = document.getElementById('datePicker');
  const timeInput = document.querySelector('input[name="user-time"]');
  const ticketTypeSelect = document.getElementById('ticket-type');

  const ticketDateSpan = document.querySelector('.overwiev__date--date');
  const ticketTimeSpan = document.querySelector('.overwiev__time--time');
  const ticketTypeSpan = document.querySelector('.overwiev__type-ticket--type-ticket');

  // Формат даты: "Friday, August 19"
  dateInput.addEventListener('change', () => {
    const selectedDate = new Date(dateInput.value);
    if (!isNaN(selectedDate)) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formatted = selectedDate.toLocaleDateString('en-US', options);
      ticketDateSpan.textContent = formatted;
    }
  });

  // Формат времени: "HH : MM"
  timeInput.addEventListener('change', () => {
    const timeValue = timeInput.value;
    if (timeValue) {
      const [h, m] = timeValue.split(':');
      ticketTimeSpan.textContent = `${h} : ${m}`;
    }
  });

  // Тип билета
  ticketTypeSelect.addEventListener('change', () => {
    const selected = ticketTypeSelect.value;
    if (selected) {
      ticketTypeSpan.textContent = selected;
    }
  });
};

export {
    inputToDiv
};

