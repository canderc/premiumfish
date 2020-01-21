const http = require('http');
const router = require('./router');

const server = http.createServer()

server.on('request', (req, res) => {
  router(req, res)
});

<<<<<<< HEAD
server.listen(5555, () => console.log('Server is running on port 5555'))
=======
server.listen(process.env.PORT || 5555, () => console.log('Server is running on port ' + (process.env.PORT || '5555')))
>>>>>>> b4a8a87390bd6f201b075a22be762ceb094e2d02
