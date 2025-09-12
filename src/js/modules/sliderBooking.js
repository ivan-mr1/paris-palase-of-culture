import Swiper from 'swiper';
import { Autoplay, EffectCube } from 'swiper/modules';

export default function sliderBooking() {
  const swiper = new Swiper('.slider-overwiev__swiper', {
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
      shadow: false,
      slideShadows: false,
      //shadowOffset: 20,
      //shadowScale: 0.94,
    },
  });
  //console.log('sliderBooking loaded');
}
