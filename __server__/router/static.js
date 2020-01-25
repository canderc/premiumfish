const fs = require('fs')
const path = require('path')


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

const handleStatic = (req, res) => {
  let content;

  const { url } = req;
  const address = url.substr(1)
  const contentType = mimeTypes[getExtname(address)]

  try {
    content = fs.readFileSync(path.resolve(__dirname, '..', '..', address));
  } catch(err) {
    content = null
    console.error('> --- Error during reading static ---', err)
  }

  res.writeHead(content ? 200 : 404, { 'Content-Type': contentType });
  res.end(content, 'utf-8');
}

module.exports = {
  handleStatic
}