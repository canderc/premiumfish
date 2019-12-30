const onResize = (fn) => {
  window.addEventListener('resize', () => setTimeout(fn, 100))
}

// @to-do: investigate how to use es6 imports in browser
window.subscribeOnResize = onResize;