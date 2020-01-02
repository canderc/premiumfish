const hamburger = require('./hamburger')
const testFetchData = require('./test-fetch')
const visualEffects = require('./visual-effects')

window.onload = function() {
  console.log('onload')
  hamburger.onLoad && hamburger.onLoad();
  testFetchData.onLoad && testFetchData.onLoad();
  visualEffects.onLoad && visualEffects.onLoad();
}