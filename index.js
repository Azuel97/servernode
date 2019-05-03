// Importo la libreria express con il require e la metto in una costante
const express = require('express')
const app = express()
const {settings, test} = require('./settings')  // Importo da un'altro file
const users = require('./routes/users')  // Importo da route gli users
const personaggi = require('./routes/personaggi')  // Importo da route i personaggi
let port = process.argv[2] || 8080

console.log(settings)
console.log(test)

// Definisco la radice dei percorsi
app.use('/users', users)
app.use('/personaggi', personaggi)


app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`);