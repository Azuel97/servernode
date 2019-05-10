// Importo la libreria express con il require e la metto in una costante
const express = require('express')
const app = express()
const users = require('./routes/users')  // Importo da route gli users
const personaggi = require('./routes/personaggi')  // Importo da route i personaggi
let port = process.argv[2] || 8080

// ----------------------------------------------  Connesione e gestione di MongoDB --------------------------------------------------------


const MongoClient = require('mongodb').MongoClient;  // Importo la classe mongodb.MongoClient
const ObjectId = require('mongodb').ObjectID;  // Importo la class ObjectID
const uri = "mongodb+srv://dbUser:kennedy@test1-rm1sk.mongodb.net/test?retryWrites=true";  // Perndo url del database
const client = new MongoClient(uri, { useNewUrlParser: true });  // Registro il mongodbclient, ovvero la classe per connettersi al database
const dbName = "servernode"  // nome del database (o scheme) su MongoDB
const collectionName = "personaggi"  // nome della collection su MongoDB


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
    const personaggi = result;
    console.log(personaggi)
  })

  // INSERT o CREATE - inserisco oggetti(o documenti) all'interno del database
  client.db(dbName).collection(collectionName, function(err, collection) {
    // Inserisco un elemento
    const Skriniar = {nome: 'Ivan', cognome: 'Perisic'};
    collection.insertOne(Skriniar);
    // Conto gli elementi contenuti nel db
    client.db("servernode").collection("personaggi").countDocuments( function (err, count) {
      if(err) throw err;
      console.log("Total rows : " + count)
    })
  }) 

  // UPDATE - aggiorno uno o più oggetti( o documenti) all'interno del database
  client.db(dbName).collection(collectionName, function (err, collection) {
    // Aggiorna un oggetto del db tramite l'utilizzo della ricerca con il suo id
    const newOne = { nome: 'Radja', cognome: 'Nainggolan', topPlayer: true};
    collection.updateOne({_id:ObjectId("5cd5365e1c9d44000075382b")}, { $set: newOne}),
         function(err, result) {
           if(err) throw err;
           console.log("Documento aggiornato correttaamente.")
         }
  })

  // DELETE - cancello un oggetto( o documento) tramite il suo id dal database
  client.db(dbName).collection(collectionName).deleteOne({_id:ObjectId("5cd536c91c9d44000075382c")}, {w:1}, function(err, result) {
    if(err) throw err
    console.log("Documento eliminato correttamente.")
  })



  // perform actions on the collection object
  client.close();  // Chiudiamo la connessione
});


// -----------------------------------------------------------------------------------------------------------------------------------



// Usa globalmente questa funzione di express per il body-parse, OBBLIGATORIO PER IL POST
app.use(express.urlencoded({extended: false}))

const myLogger = (req, res, next) =>  {
    console.log("LOGGED");
    next();
};

// Globale perchè risponde a tutti le root, midleweaar globale
app.use(myLogger);

// Definisco la radice dei percorsi, middlewear globali su più  metodi https (es: get, post, ecc...) 
//che rispondono con quel determinato path
app.use('/v0.1/users', users)
app.use('/v0.1/personaggi', personaggi)
app.use('/v0.2/personaggi', personaggi)

// Risolve il problema del 404 not found, se non viene soddisfatto nessuna root
app.use((req, res) => {
    res.status(404).send("what??? error 404")
});


app.listen(port)
//console.log(`Server running at http://127.0.0.1:${port}/`);