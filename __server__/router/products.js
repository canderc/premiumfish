const { GET, POST, productsMock } = require('../constants');
const { sendMail } = require('../services/mailer/mailer');
const { formattedCurrentDate } = require('../helpers')
const generateEmailContent = require('../services/mailer/templates');

const getProducts = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' })
  res.write(JSON.stringify(productsMock))
  res.end()
}

const purchase = (req, res) => {
  let strBody = '';

  req.on('data', function(data) {
    strBody += data;
  })

  req.on('end', function () {
    const body = JSON.parse(strBody);

    body.date = formattedCurrentDate();
    body.products = Object.keys(body.products).map(function(key) {
      return body.products[key];
    })

    sendMail({
      to: 'shop.premiumfish@gmail.com',
      subject: 'Заказ',
      html: generateEmailContent({ name: 'purchasingReceived', data: body })
    })

    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    res.end(JSON.stringify({ ok: true }));
  });
}

const handleProducts = (req, res) => {
  const { method } = req
  
  switch (method) {
    case GET:
      getProducts(req, res)
      break;

    case POST:
      purchase(req, res)
      break;
  }
}

module.exports = {
  handleProducts
}