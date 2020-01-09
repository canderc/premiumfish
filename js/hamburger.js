const toggleMenu = function({ hamburgerBtn, menu }) {
  return function() {
    hamburgerBtn.classList.toggle ('hamburger-menu_active');
    menu.classList.toggle ('menu_active')
  }
} 

module.exports = {
  onLoad: () => {
    const menu = document.querySelector ('.hamburger-menu_nav');
    // const menuLink = document.querySelectorAll ('.hamburger-menu_link');
    const hamburgerBtn = document.querySelector ('.hamburger-menu_button');

    hamburgerBtn.addEventListener('click', toggleMenu({ hamburgerBtn, menu }));
    menu.addEventListener('click', toggleMenu({ hamburgerBtn, menu }))
  }
}