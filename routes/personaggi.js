const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query
    let msg = 'Ciao'

    //console.log('RES', query)

    if(query.sesso === 'm') {
        msg = `${msg} bel uomo`
    }
    if(query.colore){
        msg = `${msg} ${query.colore} `
    }

    res.send(msg)
})


// Esporto come modulo
module.exports = router