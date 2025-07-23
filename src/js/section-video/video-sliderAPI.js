import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function sliderVideoAPI() {
  // YouTube API load (возвращает Promise)
  function loadYouTubeAPI() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        window.onYouTubeIframeAPIReady = () => {
          resolve(window.YT);
        };
        document.head.appendChild(tag);
      }
    });
  }
  //==========================================================
  async function init() {
    const YT = await loadYouTubeAPI();

    const players = new Map();
    let activeVideoId = null;

    // Инициализация Swiper
    const swiper = new Swiper('.slider-video', {
      spaceBetween: 40,
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
            nextEl: ".slider-video__button-prev",
            prevEl: ".slider-video__button-next",
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

    // Инициализируем YouTube плееры для каждого слайда
    document.querySelectorAll('.slider-video__slide').forEach(slide => {
      const videoId = slide.dataset.videoId;
      const playerId = 'player-' + videoId;
      players.set(videoId, new YT.Player(playerId, {
        videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          autoplay: 0,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onStateChange: onPlayerStateChange,
        }
      }));
    });

    // Функция остановки активного видео
    function stopActiveVideo() {
      if (activeVideoId) {
        const player = players.get(activeVideoId);
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
          player.pauseVideo();
        }
        showThumb(activeVideoId);
        togglePlayBtn(activeVideoId, false);
        activeVideoId = null;
      }
    }

    // Показываем превью
    function showThumb(videoId) {
      const slide = document.querySelector(`.slider-video__slide[data-video-id="${videoId}"]`);
      if (slide) {
        const thumb = slide.querySelector('.video-thumb');
        if (thumb) thumb.style.display = '';
      }
    }

    // Скрываем превью
    function hideThumb(videoId) {
      const slide = document.querySelector(`.slider-video__slide[data-video-id="${videoId}"]`);
      if (slide) {
        const thumb = slide.querySelector('.video-thumb');
        if (thumb) thumb.style.display = 'none';
      }
    }

    // Обновляем кнопку Play (нажат/не нажат)
    function togglePlayBtn(videoId, playing) {
      const slide = document.querySelector(`.slider-video__slide[data-video-id="${videoId}"]`);
      if (!slide) return;
      const btn = slide.querySelector('.play-btn');
      if (!btn) return;
      if (playing) {
        btn.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg fill=\'white\' viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'><rect x=\'14\' y=\'12\' width=\'12\' height=\'40\'/><rect x=\'38\' y=\'12\' width=\'12\' height=\'40\'/></svg>")'; // Pause icon
      } else {
        btn.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg fill=\'white\' viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'><polygon points=\'16,12 52,32 16,52\'/></svg>")'; // Play icon
      }
    }

    // Обработка клика по кнопке Play или слайду
    document.querySelectorAll('.slider-video__slide').forEach(slide => {
      slide.addEventListener('click', (e) => {
        // Если клик на кнопке, или просто по слайду (не на кнопке)
        if (e.target.classList.contains('play-btn') || e.target === slide) {
          const videoId = slide.dataset.videoId;
          const player = players.get(videoId);
          if (!player) return;

          if (activeVideoId === videoId && player.getPlayerState() === YT.PlayerState.PLAYING) {
            // Пауза текущего видео
            player.pauseVideo();
            togglePlayBtn(videoId, false);
            showThumb(videoId);
            activeVideoId = null;
          } else {
            // Стоп предыдущего
            stopActiveVideo();
            // Запуск нового
            player.playVideo();
            togglePlayBtn(videoId, true);
            hideThumb(videoId);
            activeVideoId = videoId;
          }
        }
      });
    });

    // Останавливаем видео при смене слайда (стрелки, буллеты)
    swiper.on('slideChangeTransitionStart', () => {
      stopActiveVideo();
    });
  }

  function onPlayerStateChange(event) {
    // Можно добавить логику, если нужно, например, чтобы кнопка менялась при окончании видео
  }

  init();

}

