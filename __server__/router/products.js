const { GET, productsMock } = require('../constants');

const getProducts = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' })
  res.write(JSON.stringify(productsMock))
  res.end()
}

const handleProducts = (req, res) => {
  const { method } = req
  
  switch (method) {
    case GET:
      getProducts(req, res)
      break;
  }
}

module.exports = {
  handleProducts
}