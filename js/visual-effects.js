
const banner = document.getElementsByClassName('banner')[0];
const header = document.getElementsByTagName('header')[0];
const sections = document.getElementsByTagName('section');

const setElementsHeight = () => {
  Array.from(sections).forEach(section => { 
    const windowHeight = window.innerHeight
    const sectionHeight = section.getBoundingClientRect().height
  
    section.style.paddingTop = header.getBoundingClientRect().height + 15 + 'px'
  
    if (sectionHeight < windowHeight) {
      section.style.height = window.innerHeight + 'px'
    }
  })
  
  banner.style.height = window.innerHeight + 'px';
}

const scroll = (e) => {
  const hash = e.target.getAttribute('href')
  const targetClassName = hash.replace(/#/, '.')

  e.preventDefault();
  
  window.location.hash = hash
  document.querySelector(targetClassName).scrollIntoView({ behavior: 'smooth' })
}

document.querySelector('.nav').addEventListener('click', scroll)
document.querySelector('.hamburg-menu_nav').addEventListener('click', scroll)

setElementsHeight();

window.subscribeOnResize(setElementsHeight)