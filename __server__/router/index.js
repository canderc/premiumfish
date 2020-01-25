const fs = require('fs')
const path = require('path')
const { PRODUCTS_URL,  FAVICON_URL} = require('../constants');
const { handleProducts } = require('./products')
const { handleStatic } = require('./static')

module.exports = (req, res) => {
  const { url } = req;

  if (url.indexOf(PRODUCTS_URL) === 0) {
    return handleProducts(req, res)
  }

  // if (url.indexOf(FAVICON_URL) === 0) {
  //   return res.end()
  // }

  if (url.indexOf('.') !== -1) {
    return handleStatic(req, res);
  }

  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'))

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write(html)
  res.end()
}