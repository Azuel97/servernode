const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Ciao, da personaggi')
})

// router.get('/personaggi', (req, res) => {
//     res.send('Personaggi')
// })

// Esporto come modulo
module.exports = router