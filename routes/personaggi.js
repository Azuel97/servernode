const express = require('express');
const router = express.Router();
const characters = require('../data/personaggi')


const MongoClient = require('mongodb').MongoClient;  // Importo la classe mongodb.MongoClient
//const ObjectId = require('mongodb').ObjectID;  // Importo la class ObjectID
const uri = "mongodb+srv://dbUser:kennedy@test1-rm1sk.mongodb.net/test?retryWrites=true";  // Perndo url del database
const client = new MongoClient(uri, { useNewUrlParser: true });  // Registro il mongodbclient, ovvero la classe per connettersi al database
const dbName = "servernode"  // nome del database (o scheme) su MongoDB
const collectionName = "personaggi"  // nome della collection su MongoDB

// Query
// chiedi http://localhost:7070/personaggi?colore=giallo&sesso=m , sono funzioni di middlewear
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

  


  client.connect(err => {
    // Controllo se la connessione avviene oppure no
    if(err) {
      console.log("Error occured while connecting to MongoDB Atlas ...");
    }
    console.log("Connected...");
    //const collection = client.db("servernode").collection("personaggi"); inizio controllando la connessione, incastro la connection del mio db
  
    // READ - leggo tutto il contenuto del database
    client.db(dbName).collection(collectionName).find().toArray( function (err, result) {
      if(err) throw err
      const personaggiDB = result;
      console.log(personaggiDB)
      res.send(personaggiDB)
    })
  
    // perform actions on the collection object
    client.close();  // Chiudiamo la connessione
  });


  // res.send(personaggiDB)
  next();

}, (req, res) => {
        console.log("FIRE")
    }
)


// Params
//http://localhost:7070/personaggi/9
// Passo una variabile id al nostro url tramite ':id'
router.get('/:id/', (req, res) => {
    // Converto la stringa passata da req.param.id in un numero
    const id = Number(req.params.id)
    let personaggi = characters.characters
  
    res.json(personaggi.filter(personaggio => personaggio.id === id))

    console.log('ID : ', id)
})

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
})


module.exports = router