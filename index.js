// Importo la libreria express con il require e la metto in una costante
const express = require('express')
const app = express()
const fs = require('fs')
let port = process.argv[2] || 8080


app.get('/books', function (req, res) {
  const filename = 'books.json'
  fs.readFile(filename, function(e, data) {
      // 500 Internet Servers Error
      if(e) return res.sendStatus(500)
      try {
          books = JSON.parse(data)
      } catch (e) {
          res.sendStatus(500);
      }
      res.json(books)
  })
})

app.get('/menu', function (req, res) {
    const filename = 'menu.json'
    fs.readFile(filename, function(e, data) {
        // 500 Internet Servers Error
        if(e) return res.sendStatus(500)
        try {
            menu = JSON.parse(data)
        } catch (e) {
            res.sendStatus(500);
        }
        res.json(menu)
    })
  })

  app.get('/settings', function (req, res) {
    const filename = 'settings.json'
    fs.readFile(filename, function(e, data) {
        // 500 Internet Servers Error
        if(e) return res.sendStatus(500)
        try {
            settings = JSON.parse(data)
        } catch (e) {
            res.sendStatus(500);
        }
        res.json(settings)
    })
  })

  app.get('/users', function (req, res) {
    const filename = 'users.json'
    fs.readFile(filename, function(e, data) {
        // 500 Internet Servers Error
        if(e) return res.sendStatus(500)
        try {
            users = JSON.parse(data)
        } catch (e) {
            res.sendStatus(500);
        }
        res.json(users)
    })
  })
 
app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`);