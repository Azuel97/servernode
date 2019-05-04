const express = require('express')
const router = express.Router();
const characters = require('../data/personaggi')


router.get('/', (req, res) => {
    const query = req.query
    let personaggi = characters.characters

    if('lastname' in query){
        personaggi = personaggi.filter((personaggio) => {
            return personaggio.lastname === query.lastname
        })
    }
    
    res.send(personaggi)   
    
})

// Esporto come modulo
module.exports = router