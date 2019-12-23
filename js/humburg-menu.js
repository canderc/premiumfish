var menu = document.querySelector ('.hamburg-menu_nav');
var menuLinc = document.querySelectorAll ('.hamburg-menu_link');
var hamburg = document.querySelector ('.hamburg-menu_button');

hamburg.addEventListener ('click', function() {
  hamburg.classList.toggle ('hamburg-menu_active');
  menu.classList.toggle ('menu_active')
});