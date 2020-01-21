const http = require('http');
const router = require('./router');

const server = http.createServer()

server.on('request', (req, res) => {
  router(req, res)
});

server.listen(process.env.PORT || 5555, () => console.log('Server is running on port ' + (process.env.PORT || '5555')))
