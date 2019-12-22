const fadeInElementsList = document.getElementsByClassName('fade-in-hidden');
const banner = document.getElementsByClassName('banner')[0];

// @to do: use separate js file for such things
banner.style.height = window.innerHeight + 'px';

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.isIntersecting  && entry.target.classList.add('fade-in')
  }, { threshold: 1.0})
})

Array.from(fadeInElementsList).forEach(fadeInElement => observer.observe(fadeInElement))