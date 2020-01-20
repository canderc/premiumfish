const fs = require('fs')
const path = require('path')
const { PRODUCTS_URL,  FAVICON_URL} = require('../constants');
const { handleProducts } = require('./products')

const getExtname = (filePath) => String(path.extname(filePath)).toLowerCase();

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

module.exports = (req, res) => {
  const { url } = req;

  if (url.indexOf(PRODUCTS_URL) === 0) {
    return handleProducts(req, res)
  }

  // if (url.indexOf(FAVICON_URL) === 0) {
  //   return res.end()
  // }

  if (url.indexOf('.') !== -1) {
    const address = url.substr(1)
    
    const contentType = mimeTypes[getExtname(address)]

    const content = fs.readFileSync(path.resolve(__dirname, '..', '..', address));

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');

    return;
  }

  const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'))

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write(html)
  res.end()
}