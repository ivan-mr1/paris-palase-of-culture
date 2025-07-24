import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function sliderWelcome() {
    const totalSlides = document.querySelectorAll('.slider-welcome__slide').length;

    function updateCounter(currentIndex) {
        const current = (currentIndex + 1).toString().padStart(2, '0');
        const total = totalSlides.toString().padStart(2, '0');

        document.querySelector('.counter').innerHTML = `
            <span class="counter__current">${current}</span> 
            | 
            <span class="counter__total">${total}</span>
        `;
    }

    const swiper = new Swiper('.slider-welcome__swiper', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: ".slider-welcome__next",
            prevEl: ".slider-welcome__prew",
        },
        pagination: {
            el: '.dots',
            type: "bullets",
            clickable: true,
            bulletClass: "dot",
            bulletActiveClass: "dot_active",
            renderBullet: function (index, className) {
                return '<div class="' + className + '"></div>';
            },
        },
        mousewheel: true,
        keyboard: true,
        modules: [Navigation, Pagination],
        on: {
            init: function () {
                updateCounter(this.realIndex);
            },
            slideChange: function () {
                updateCounter(this.realIndex);
            }
        }
    });


}


