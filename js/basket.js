const buttonBasketClose = document.querySelector ('.basket-close_button');
const basket = document.querySelector ('.basket');
const basketIcons = document.querySelector ('.basket-icons')

buttonBasketClose.addEventListener ('click', function() {
    basket.classList.remove ('basket');
    basket.classList.add ('basket-close');
})

basketIcons.addEventListener ('click', function() {
    basket.classList.toggle ('basket')
})