const hamburger = require('./hamburger')
// const testFetchData = require('./test-fetch')
const visualEffects = require('./visual-effects')
require('./products')

window.onload = function() {
  hamburger.onLoad && hamburger.onLoad();
  // testFetchData.onLoad && testFetchData.onLoad();
  visualEffects.onLoad && visualEffects.onLoad();
}