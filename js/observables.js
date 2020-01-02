const onResize = function(fn) {
  window.addEventListener('resize', function() { setTimeout(fn, 100) })
}

module.exports = {
  onResize
}