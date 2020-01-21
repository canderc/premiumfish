const hamburger = require('./hamburger')
const products = require('./products')
const visualEffects = require('./visual-effects')
const basket = require('./basket')
require('./products')

window.onload = function() {
  hamburger.onLoad && hamburger.onLoad();
  products.onLoad && products.onLoad();
  visualEffects.onLoad && visualEffects.onLoad();
  basket.onLoad && basket.onLoad();
}