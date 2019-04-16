// Semplice web server
// modulo http

const http = require('http');

const server = http.createServer(function(req,res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('Ciao, world!');
    res.end();
});

// In ascolto
// server.listen(porta,url);

server.listen(8080, '127.0.0.1');

console.log(`Server running at http://127.0.0.1:8080/`);