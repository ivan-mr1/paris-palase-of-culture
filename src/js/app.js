'use strict';

import scrollUp from './modules/scrollUp';
import popup from './modules/popup';
import { mapLazy } from './modules/mapLazy';
import { formValidate } from './modules/form-validate';
import { inputToDiv } from './modules/inputToDiv';
import { ticketCalc } from './modules/ticketsCalc';
import { modalCalcTickets } from './modules/modalCalc';
import pageNavigation from './modules/page-navigation';
import menuBurger from './modules/menu-burger';
import gallery from './modules/gallery';

window.addEventListener('DOMContentLoaded', () => {
  scrollUp();
  popup();
  formValidate();
  inputToDiv();
  ticketCalc();
  modalCalcTickets();
  pageNavigation();
  menuBurger();
  gallery();
  mapLazy();
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

  // console.log(`реализовано:
  //       - кнопка вверх
  //       - мобильное меню бургер
  //       - слайдер в секции welcome
  //       - слайдер сравнения изображений
  //       - видеоплеер
  //       - слайдер видео
  //       - анимация галереи
  //       - слайдер в секции tickets
  //       - калькулятор стоимости билетов с сохранением в local storage
  //       - модальное окно
  //       - слайдер в модальном окне
  //       - валидация формы
  //       - ленивая загрузка карты
  //       `);
});
