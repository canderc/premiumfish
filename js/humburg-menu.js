const menu = document.querySelector ('.hamburg-menu_nav');
const menuLink = document.querySelectorAll ('.hamburg-menu_link');
const hamburgerBtn = document.querySelector ('.hamburg-menu_button');

const toggleMenu = () => {
  hamburgerBtn.classList.toggle ('hamburg-menu_active');
  menu.classList.toggle ('menu_active')
}

hamburgerBtn.addEventListener('click', toggleMenu);
menu.addEventListener('click', toggleMenu)