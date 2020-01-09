const buttonBasketClose = document.querySelector ('.basket-close_button');
const basket = document.querySelector ('.basket-close');
const basketIcons = document.querySelector ('.basket-icons')

buttonBasketClose.addEventListener ('click', function() {
    basket.classList.toggle ('basket-close');
    basket.classList.remove ('basket');
})

basketIcons.addEventListener ('click', function() {
    basket.classList.toggle ('basket')
})