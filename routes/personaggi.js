const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query
    let msg = 'Ciao'

    //console.log('RES', query)
    if(query.key === '97979979797979797979') {
        msg = `Mario rossi `

        if(query.sesso === 'm') {
            msg = `${msg} bel uomo`
        }
        if(query.colore){
            msg = `${msg} ${query.colore} `
        }
    }   

    res.send(msg)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log('ID : ', id)
    res.send(`personaggio id : ${id}`)
})


// Esporto come modulo
module.exports = router