const request = require('./services/request')

const productsContainer = document.querySelector('.products');

module.exports = {
  onLoad: function() {
    request.get('/api/products')
      .then(function(products) {
        productsContainer.innerText = JSON.stringify(products, null, 3)
      });
  }
}