const { PRODUCTS_URL,  FAVICON_URL} = require('../constants');
const { handleProducts } = require('./products')

module.exports = (req, res) => {
  const { url } = req;

  if (url.indexOf(PRODUCTS_URL) === 0) {
    return handleProducts(req, res)
  }

  if (url.indexOf(FAVICON_URL) === 0) {
    return res.end()
  }

  res.writeHead(404)
  res.write('Page not found')
  res.end()
}