const express = require('express')
const router = express.Router();




router.get('/', (req, res) => {
    res.send('Ciao, da users')
})

// router.get('/test', function(req, res){
//     const data = "";
//     if (req.body.name) { data = `Name: ${req.body.name}`}
//     res.send(data)    
//   });


// router.get('/personaggi', (req, res) => {
//     res.send('Personaggi')
// })

// Esporto come modulo
module.exports = router