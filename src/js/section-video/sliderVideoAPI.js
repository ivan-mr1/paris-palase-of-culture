import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function sliderVideoAPI() {
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

  let activeVideoId = null;
  const players = new Map();
  let swiper = null;

  async function init() {
    const YT = await loadYouTubeAPI();

    swiper = new Swiper('.slider-video', {
      spaceBetween: 40,
      slidesPerView: 3,
      loop: true,
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 15 },
        425: { slidesPerView: 2, spaceBetween: 20 },
        769: { slidesPerView: 3, spaceBetween: 30 },
      },
      navigation: {
        nextEl: '.slider-video__button-prev',
        prevEl: '.slider-video__button-next',
      },
      pagination: {
        el: '.slider-video__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'slider-dot',
        bulletActiveClass: 'slider-dot_active',
        renderBullet: (index, className) => `<div class="${className}"></div>`,
      },
      mousewheel: true,
      keyboard: true,
      modules: [Navigation, Pagination],
    });

    // Создание YouTube-плееров
    document.querySelectorAll('.slider-video__slide').forEach((slide) => {
      const videoId = slide.dataset.videoId;
      const playerId = 'player-' + videoId;

      players.set(
        videoId,
        new YT.Player(playerId, {
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
            onStateChange: (event) => onPlayerStateChange(event, videoId),
          },
        }),
      );
    });

    // Функции управления thumb и кнопками
    function showThumb(videoId) {
      const slide = document.querySelector(
        `.slider-video__slide[data-video-id="${videoId}"]`,
      );
      if (!slide) {
        return;
      }
      const thumb = slide.querySelector('.video-thumb');
      if (thumb) {
        thumb.style.display = '';
      }
    }

    function hideThumb(videoId) {
      const slide = document.querySelector(
        `.slider-video__slide[data-video-id="${videoId}"]`,
      );
      if (!slide) {
        return;
      }
      const thumb = slide.querySelector('.video-thumb');
      if (thumb) {
        thumb.style.display = 'none';
      }
    }

    function togglePlayBtn(videoId, playing) {
      const slide = document.querySelector(
        `.slider-video__slide[data-video-id="${videoId}"]`,
      );
      if (!slide) {
        return;
      }
      const btn = slide.querySelector('.play-btn');
      if (!btn) {
        return;
      }

      if (playing) {
        btn.style.backgroundImage =
          "url(\"data:image/svg+xml;utf8,<svg fill='%23B3B3B3' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><rect x='14' y='12' width='12' height='40'/><rect x='38' y='12' width='12' height='40'/></svg>\")";
      } else {
        btn.style.backgroundImage =
          "url(\"data:image/svg+xml;utf8,<svg fill='%23B3B3B3' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><polygon points='16,12 52,32 16,52'/></svg>\")";
      }
    }

    // Обработка окончания видео
    function onPlayerStateChange(event, videoId) {
      if (event.data === YT.PlayerState.ENDED) {
        togglePlayBtn(videoId, false);
        showThumb(videoId);
        if (activeVideoId === videoId) {
          activeVideoId = null;
        }
      }
    }

    // Остановка текущего активного видео (используется при смене слайда)
    function stopActiveVideo() {
      if (activeVideoId) {
        const prevPlayer = players.get(activeVideoId);
        if (
          prevPlayer &&
          prevPlayer.getPlayerState() === YT.PlayerState.PLAYING
        ) {
          prevPlayer.pauseVideo();
        }
        togglePlayBtn(activeVideoId, false);
        showThumb(activeVideoId);
        activeVideoId = null;
      }
    }

    // Обработка кликов по кнопке, превью и слайду
    document.querySelectorAll('.slider-video__slide').forEach((slide) => {
      slide.addEventListener('click', (e) => {
        const clickedOnPlayBtn = e.target.classList.contains('play-btn');
        const clickedOnThumb = e.target.classList.contains('video-thumb');
        const clickedOnSlide = e.target === slide;

        if (clickedOnPlayBtn || clickedOnThumb || clickedOnSlide) {
          const videoId = slide.dataset.videoId;
          const player = players.get(videoId);
          if (!player) {
            return;
          }

          const isSameVideo = activeVideoId === videoId;
          const wasPlaying = player.getPlayerState() === YT.PlayerState.PLAYING;

          if (isSameVideo && wasPlaying) {
            player.pauseVideo();
            togglePlayBtn(videoId, false);
            showThumb(videoId);
            activeVideoId = null;
          } else {
            // Остановим другое активное видео
            if (activeVideoId && activeVideoId !== videoId) {
              const prevPlayer = players.get(activeVideoId);
              if (
                prevPlayer &&
                prevPlayer.getPlayerState() === YT.PlayerState.PLAYING
              ) {
                prevPlayer.pauseVideo();
                togglePlayBtn(activeVideoId, false);
                showThumb(activeVideoId);
              }
            }

            // Остановим основной видеоплеер
            if (window.mainPlayerAPI) {
              window.mainPlayerAPI.stopMainVideo();
            }

            player.playVideo();
            togglePlayBtn(videoId, true);
            hideThumb(videoId);
            activeVideoId = videoId;
          }
        }
      });
    });

    // Остановка при перелистывании слайда
    swiper.on('slideChangeTransitionStart', stopActiveVideo);

    return {
      stopActiveVideo,
    };
  }

  return init();
}
