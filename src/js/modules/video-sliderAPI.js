
  import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

  const ytPlayers = new Map();
  let activePlayer = null;
  let swiper;

  window.onYouTubeIframeAPIReady = () => {
    document.querySelectorAll('.slider-video__slide').forEach((slide, idx) => {
      const vid = slide.dataset.videoId;
      const cont = slide.querySelector('.video-container');

      const player = new YT.Player(cont, {
        videoId: vid,
        events: {
          onStateChange: e => {
            if (e.data === YT.PlayerState.PLAYING) {
              stopAllExcept(vid);
              activePlayer = player;
              slide.querySelector('.play-btn').classList.add('playing');
            }
            if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
              slide.querySelector('.play-btn').classList.remove('playing');
            }
          }
        },
        playerVars: { modestbranding: 1, rel: 0, showinfo: 0 }
      });

      ytPlayers.set(vid, player);

      slide.querySelector('.play-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (player.getPlayerState() === YT.PlayerState.PLAYING) player.pauseVideo();
        else player.playVideo();
      });

      slide.addEventListener('click', () => {
        const state = player.getPlayerState();
        if (state !== YT.PlayerState.PLAYING) player.playVideo();
      });
    });

    swiper = new Swiper('.video__slider', {
      loop: true,
      slidesPerView: 1,
      navigation: {
        nextEl: '.slider-video__button-next',
        prevEl: '.slider-video__button-prev'
      },
      pagination: {
        el: '.slider-video__pagination',
        clickable: true
      },
      on: {
        slideChangeTransitionStart: () => stopAll()
      }
    });
  };

  function stopAll() {
    ytPlayers.forEach(p => {
      if (p.pauseVideo) p.pauseVideo();
    });
    activePlayer = null;
    document.querySelectorAll('.play-btn.playing').forEach(btn => btn.classList.remove('playing'));
  }

  function stopAllExcept(id) {
    ytPlayers.forEach((p, vid) => {
      if (vid !== id && p.pauseVideo) p.pauseVideo();
    });
    document.querySelectorAll('.play-btn.playing').forEach(btn => {
      if (btn.closest('.slider-video__slide').dataset.videoId !== id)
        btn.classList.remove('playing');
    });
  }

