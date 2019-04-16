// Semplice web server
// modulo http

const http = require('http');
const port = 7070;

const server = http.createServer(function(req,res) {
    // Fa vedere url richiesto
    console.log(req.url);

    if(req.url === '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write('<h1>Home</h1>');
        res.end();  
    } else if (req.url === '/api') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(JSON.stringify(
            {
                "version": "0.1",
                "nome": "Mia API personale",
                "data": "2019-04-16"
            }
        ));
        res.end();
    } else {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(`<h1>${req.url}</h1>`);
        res.end();
    }
    
});

// In ascolto
// server.listen(porta,url);

server.listen(port, '127.0.0.1');

console.log(`Server running at http://127.0.0.1:${port}/`);