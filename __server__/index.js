const http = require('http');
const router = require('./router');

const server = http.createServer()

server.on('request', (req, res) => {
  router(req, res)
});

server.listen(4444, () => console.log('Server is running on port 4444'))