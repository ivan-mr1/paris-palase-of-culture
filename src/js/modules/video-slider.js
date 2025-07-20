import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function sliderVideo() {
  let swiperVideo = new Swiper(".slider-video", {    
    spaceBetween: 40,
    //freeMode: true,
    slidesPerView: 3,
    breakpoints: {
      320: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      769: {
          slidesPerView: 3,
          spaceBetween: 42
      }
    },
    loop: true,
      navigation: {
          nextEl: ".slider-video__button-next",
          prevEl: ".slider-video__button-prev",
      },
      pagination: {
          el: '.slider-video__pagination',
          type: "bullets",
          clickable: true,
          bulletClass: "slider-dot",
          bulletActiveClass: "slider-dot_active",
          renderBullet: function (index, className) {
              return '<div class="' + className + '"></div>';
          },
      },
      mousewheel: true,
      keyboard: true,
      modules: [Navigation, Pagination]
  });
}
