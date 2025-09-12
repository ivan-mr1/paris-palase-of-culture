export default function menuBurger() {
  const menu = document.querySelector('.menu__body'),
    menuBtn = document.querySelector('.icon-menu');

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('menu-open');
      menuBtn.classList.toggle('menu-open');
      document.body.classList.toggle('lock');

      document.querySelector('.welcome__content').classList.toggle('menu-open'); //only project museum louvre, revove this instruction
    });

    menu.addEventListener('click', (event) => {
      if (event.target.classList.contains('menu__body')) {
        menu.classList.remove('menu-open');
        menuBtn.classList.remove('menu-open');
        document.body.classList.remove('lock');

        document
          .querySelector('.welcome__content')
          .classList.remove('menu-open'); //only project museum louvre, revove this instruction
      }
    });

    menu.querySelectorAll('.menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        //скролл к секциям
        menu.classList.remove('menu-open');
        menuBtn.classList.remove('menu-open');
        document.body.classList.remove('lock');

        document
          .querySelector('.welcome__content')
          .classList.remove('menu-open'); //only project museum louvre, revove this instruction
      });
    });
  }
}
