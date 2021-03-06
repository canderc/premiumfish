const { onResize } = require('./observables');

const banner = document.getElementsByClassName('banner')[0];
const header = document.getElementsByTagName('header')[0];
const sections = document.getElementsByTagName('section');
// const nav = querySelector('.nav');

// smooth scrolling
const setElementsHeight = () => {
  Array.from(sections).forEach(section => { 
    const windowHeight = window.innerHeight
    const sectionHeight = section.getBoundingClientRect().height
    const headerHeight = header.getBoundingClientRect().height
  
    section.style.paddingTop = headerHeight + 15 + 'px'

    if (sectionHeight < windowHeight) {
      section.style['min-height'] = window.innerHeight + 'px'
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


Array.from(document.querySelectorAll('.nav')).forEach(nav => nav.addEventListener('click', scroll))
document.querySelector('.hamburger-menu_nav').addEventListener('click', scroll)

onResize(setElementsHeight)

// active nav item effect
const activeItemUnderline = document.querySelector('.active-item-underline');
const navAList = Array.from(document.querySelector('.nav').querySelectorAll('a'));
const hash = window.location.hash || '#home'

const underlineSelectedItem = (item) => {
  let left = 0

  for (let i = 0; i < navAList.length; i++) {
    if (navAList[i] !== item) {
      left = left + navAList[i].getBoundingClientRect().width
    } else {
      break;
    }
  }

  const itemWidth = item.getBoundingClientRect().width

  activeItemUnderline.style.width = itemWidth + 'px';
  activeItemUnderline.style.left = left + 'px';
}

const changeSelectedItem = (e) => {
  e.preventDefault()

  const href = e.target.getAttribute('href');
  const item =  navAList.find(navA => navA.getAttribute('href') === href);

  underlineSelectedItem(item)
}

Array.from(document.querySelectorAll('.nav')).forEach(nav => nav.addEventListener('click', changeSelectedItem))


// actions before load and onload
activeItemUnderline.style.transition = 'all 0s'
activeItemUnderline.style.display = 'none'

// window.onload = () => {
//   setElementsHeight()
//   underlineSelectedItem(document.querySelector(`[href="${hash}"]`))
  
//   activeItemUnderline.style.display = 'block'
//   activeItemUnderline.style.transition = 'all .6s'
// }
module.exports = {
  onLoad: () => {
    setElementsHeight()
    underlineSelectedItem(document.querySelector(`[href="${hash}"]`))
  
    activeItemUnderline.style.display = 'block'
    activeItemUnderline.style.transition = 'all .6s'
  }
}
