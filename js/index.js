const hamburger = require('./hamburger')
const products = require('./products')
const visualEffects = require('./visual-effects')
require('./products')

window.onload = function() {
  hamburger.onLoad && hamburger.onLoad();
  products.onLoad && products.onLoad();
  visualEffects.onLoad && visualEffects.onLoad();
}