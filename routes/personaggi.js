const express = require('express');
const router = express.Router();
const characters = require('../data/personaggi')

// Query
// chiedi http://localhost:7070/personaggi?colore=giallo&sesso=m , sono funzioni di middlewear
router.get('/', (req, res) => {
  res.send(characters)
  
});


// Params
//http://localhost:7070/personaggi/9
// Passo una variabile id al nostro url tramite ':id'
router.get('/:id/', (req, res) => {
    // Converto la stringa passata da req.param.id in un numero
    const id = Number(req.params.id)
    let personaggi = characters.characters
  
    res.json(personaggi.filter(personaggio => personaggio.id === id))

    console.log('ID : ', id)
});

// Metodi POST, non va in conflitto con l'id perhcè è post
router.post('/form', (req, res) => {
    //console.log(req.body)
    const body = req.body
    const {nome, cognome} = req.body
    const status = {}
    console.log(nome, cognome)

    // Controlli sul POST vanno fatti sia lato client che lato server, in questo caso controlliamo che ci 
    // sia il nome all'interno del form in modo che sia obbligatorio, si può fare su più campi
    if(nome) {
        status.code = 'ok'
        status.message = `Benvenuto ${nome}`
    } else {
        status.code = 'error'
        status.message = 'nome non valido'
        status.campo = 'nome'
    }

    //res.send(body)
    res.send(status)
});


module.exports = router