// Importo la libreria express con il require e la metto in una costante
const express = require('express')
const app = express()
const {settings, test} = require('./settings')  // Importo da un'altro file
const users = require('./routes/users')  // Importo da route gli users
const personaggi = require('./routes/personaggi')  // Importo da route i personaggi
let port = process.argv[2] || 8080

const myLogger = (req, res, next) =>  {
    console.log("LOGGED");
    next();
};

app.use(myLogger);

// console.log(settings)
// console.log(test)

// Definisco la radice dei percorsi
app.use('/v0.1/users', users)
app.use('/v0.1/personaggi', personaggi)
app.use('/v0.2/personaggi', personaggi)

// Risolve il problema del 404 not found, se non viene soddisfatto nessuna root
app.use((req, res) => {
    res.status(404).send("what??")
});


app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`);