// import { _slideDown, _slideUp, _slideToggle } from "./function";
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';

// import addDate from "./modules/addDate";
import scrollUp from './modules/scrollUp';
// import initCountdown from "./modules/timer-countdown";
// import tabs from "./modules/tabs";
import popup from './modules/popup';
import { mapLazy } from './modules/mapLazy';
// import spollers from "./modules/spollers";
// import { stepperCounter } from "./modules/stepperCounter";
import { formValidate } from './modules/form-validate';
import { inputToDiv } from './modules/inputToDiv';
import { ticketCalc } from './modules/ticketsCalc';
import { modalCalcTickets } from './modules/modalCalc';

// import headerFon from "./modules/headerFon";
import pageNavigation from './modules/page-navigation';
import menuBurger from './modules/menu-burger';

import gallery from './modules/gallery';

// Убраны статические импорты тяжёлых модулей
// import sliderWelcome from './modules/welcome-slider';
// import sliderComparisonImages from './modules/sliderComparisonImages';
// import customMainVideoPlayer from "./section-video/customMainVideoPlayer";
// import sliderVideoAPI from "./section-video/sliderVideoAPI";

('use strict');

window.addEventListener('DOMContentLoaded', () => {
  // Основные модули вызываем сразу
  // getting today's date and displaying it on a page in Russian or English (HTML and JavaScript) <div class="date"></div>
  // addDate();

  // для каждого нового вызова передавать класс таймера, конечную дату в формате '29 Jun 2025 17:28' и сообщение об окончании таймера 'The timer is over'
  // Передача конечной даты
  // initCountdown('.countdown', '27 Jun 2025 12:30', 'The timer is over');
  // Передача количества секунд (сутки = 86400с) (1 час = 3600секунд)
  // initCountdown('.countdown', 86440, 'The timer is over'); // Таймер на 1 день (86400 секунд)

  // tabs();

  // spollers();

  // headerFon();

  // go to top button with scroll indicator and smooth scrolling to the top
  scrollUp();
  popup();

  //stepperCounter();
  formValidate();
  inputToDiv();
  ticketCalc();
  modalCalcTickets();

  pageNavigation();
  menuBurger();
  gallery();
  mapLazy(); // lazy loadind click google maps

  // Динамическая загрузка с обработкой ошибок для каждого модуля отдельно
  import('./modules/welcome-slider')
    .then((m) => m.default())
    .catch((err) =>
      console.error('Ошибка загрузки модуля "welcome-slider":', err),
    );

  import('./modules/sliderComparisonImages')
    .then((m) => m.default())
    .catch((err) =>
      console.error('Ошибка загрузки модуля "sliderComparisonImages":', err),
    );

  import('./section-video/customMainVideoPlayer')
    .then((m) => m.default())
    .catch((err) =>
      console.error('Error loading module "customMainVideoPlayer":', err),
    );

  import('./section-video/sliderVideoAPI')
    .then((m) => {
      window.sliderVideoAPIInstance = m.default();
    })
    .catch((err) =>
      console.error('Error loading module "sliderVideoAPI":', err),
    );

  import('./modules/sliderTickets')
    .then((m) => {
      window.sliderVideoAPIInstance = m.default();
    })
    .catch((err) =>
      console.error('Error loading module "sliderTickets":', err),
    );

  import('./modules/sliderBooking')
    .then((m) => {
      window.sliderVideoAPIInstance = m.default();
    })
    .catch((err) =>
      console.error('Error loading module "sliderBooking":', err),
    );

  //console.log('main functionality loaded');
  console.log(`реализовано:
        - кнопка вверх
        - мобильное меню бургер
        - слайдер в секции welcome
        - слайдер сравнения изображений
        - видеоплеер 
        - слайдер видео
        - анимация галереи
        - слайдер в секции tickets
        - калькулятор стоимости билетов с сохранением в local storage
        - модальное окно
        - слайдер в модальном окне
        - валидация формы
        - ленивая загрузка карты
        `);
});
