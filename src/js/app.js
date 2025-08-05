// import { _slideDown, _slideUp, _slideToggle } from "./function";
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';

// import addDate from "./modules/addDate";
 import scrollUp from "./modules/scrollUp";
// import initCountdown from "./modules/timer-countdown";
// import tabs from "./modules/tabs";
 import popup from "./modules/popup";
// import spollers from "./modules/spollers";
 import { stepperCounter } from "./modules/stepperCounter";

// import headerFon from "./modules/headerFon";
import pageNavigation from "./modules/page-navigation";
import menuBurger from "./modules/menu-burger";

import gallery from './modules/gallery';

// Убраны статические импорты тяжёлых модулей
// import sliderWelcome from './modules/welcome-slider';
// import sliderComparisonImages from './modules/sliderComparisonImages';
// import customMainVideoPlayer from "./section-video/customMainVideoPlayer";
// import sliderVideoAPI from "./section-video/sliderVideoAPI";

'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Основные модули вызываем сразу
    scrollUp();
    popup();
    stepperCounter();
    pageNavigation();
    menuBurger();
    gallery();

    // Динамическая загрузка с обработкой ошибок для каждого модуля отдельно
    import('./modules/welcome-slider')
        .then(m => m.default())
        .catch(err => console.error('Ошибка загрузки модуля "welcome-slider":', err));


    import('./modules/sliderComparisonImages')
        .then(m => m.default())
        .catch(err => console.error('Ошибка загрузки модуля "sliderComparisonImages":', err)); 


    import('./section-video/customMainVideoPlayer')
        .then(m => m.default())
        .catch(err => console.error('Error loading module "customMainVideoPlayer":', err)); 

    import('./section-video/sliderVideoAPI')
        .then(m => {
            window.sliderVideoAPIInstance = m.default();
        })
        .catch(err => console.error('Error loading module "sliderVideoAPI":', err));

    import('./modules/sliderTickets')
        .then(m => {
            window.sliderVideoAPIInstance = m.default();
        })
        .catch(err => console.error('Error loading module "sliderTickets":', err));

    import('./modules/sliderBooking')
        .then(m => {
            window.sliderVideoAPIInstance = m.default();
        })
        .catch(err => console.error('Error loading module "sliderBooking":', err));

    console.log('main functionality loaded');
});
