import Swiper from 'swiper';
import { Autoplay, EffectCube } from 'swiper/modules'; 

export default function sliderTickets() {
    const swiper = new Swiper('.slider-tickets__swiper', {
        modules: [Autoplay, EffectCube],
        spaceBetween: 10,
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 10,
            shadowScale: 0.8,
        },
    });
    //console.log('sliderTickets loaded');
}


