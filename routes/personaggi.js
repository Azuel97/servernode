const express = require('express');
const router = express.Router();
const characters = require('../data/personaggi')

// QUery
// chiedi http://localhost:7070/personaggi?colore=giallo&sesso=m
router.get('/', (req, res, next) => {
  const query = req.query
  let personaggi = characters.characters

  if ('lastname' in query) {
    personaggi = personaggi.filter((personaggio) => {
      return personaggio.lastname === query.lastname
    })
  }

  if ('firstname' in query) {
    personaggi = personaggi.filter((personaggio) => {
      return personaggio.firstname === query.firstname
    })
  }

  res.send(personaggi)
  next();

}, (req, res) => {
        console.log("FIRE")
    }
)





// Params
//http://localhost:7070/personaggi/9
// Passo una variabile id al nostro url
router.get('/:id/', (req, res) => {
    // Converto la stringa passata da req.param.id in un numero
    const id = Number(req.params.id)
    let personaggi = characters.characters
  
    res.json(personaggi.filter(personaggio => personaggio.id === id))

    console.log('ID : ', id)
})

module.exports = router