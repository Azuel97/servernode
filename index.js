// Importo la libreria express con il require e la metto in una costante
const express = require('express')
const app = express()
const users = require('./routes/users')  // Importo da route gli users
const personaggi = require('./routes/personaggi')  // Importo da route i personaggi
let port = process.argv[2] || 8080

// Usa globalmente questa funzione di express per il body-parse, OBBLIGATORIO PER IL POST
app.use(express.urlencoded({extended: false}))

const myLogger = (req, res, next) =>  {
    console.log("LOGGED");
    next();
};

// Globale perchè risponde a tutti le root, midleweaar globale
app.use(myLogger);

// Definisco la radice dei percorsi, middlewear globali su più  metodi https (es: get, post, ecc...) 
//che rispondono con quel determinato path
app.use('/v0.1/users', users)
app.use('/v0.1/personaggi', personaggi)
app.use('/v0.2/personaggi', personaggi)

// Risolve il problema del 404 not found, se non viene soddisfatto nessuna root
app.use((req, res) => {
    res.status(404).send("what??? error 404")
});


app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`);