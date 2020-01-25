const http = require('http');
const router = require('./router');
const { initMailer } = require('./services/mailer/mailer');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5555;

const server = http.createServer();

initMailer(env);

server.on('request', (req, res) => {
  router(req, res)
});

server.listen(port, () => console.log(`> Server is running on port: ${port} in ${env} environment`))
