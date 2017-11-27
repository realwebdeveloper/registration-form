const http = require('http');
const router = require('./router');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(router.handleRequest);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



