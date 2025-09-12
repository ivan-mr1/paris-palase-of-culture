const stepperCounter = () => {
  const carts = document.querySelectorAll('.js-cart'); //делегирование событий, вешаем обработчик на все корзины

  const updateCartItemCount = () => {
    carts.forEach((cart) => {
      cart.addEventListener('click', (e) => {
        let currentItems, minusBtn;

        if (e.target.matches('.js-minus') || e.target.matches('.js-plus')) {
          const counter = e.target.closest('.js-counter'); //ближайший родитель для элемента, по которому был клик
          currentItems = counter.querySelector('.js-current-items'); //текущее значение счетчика, ищем именно внутри родителя, а не всего документа
          minusBtn = counter.querySelector('.js-minus');
        }

        if (e.target.matches('.js-plus')) {
          currentItems.textContent = ++currentItems.textContent;
          minusBtn.classList.remove('disabled');
        }

        if (e.target.matches('.js-minus')) {
          if (parseInt(currentItems.textContent) > 1) {
            currentItems.textContent = --currentItems.textContent;
          } else if (parseInt(currentItems.textContent) === 1) {
            //если 0, делаем кнопку не активной
            currentItems.textContent = --currentItems.textContent;
            minusBtn.classList.add('disabled');
          }
        }
      });
    });
  };
  updateCartItemCount();
};

export { stepperCounter };

/* 
<div class="js-counter">
  <button type="button" class="js-minus disabled">-</button>
  <div class="js-current-items">1</div>
  <button type="button" class="js-plus">+</button>
</div>
*/
