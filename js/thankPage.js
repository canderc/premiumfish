const modalWindow = document.querySelector ('#window-thank');
const thankPageButton = document.querySelector ('.thank-page_button');

thankPageButton.addEventListener ('click', function() {
    modalWindow.classList.toggle ('modal-window-close');
    modalWindow.classList.remove ('modal-window');
})

