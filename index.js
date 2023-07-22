const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const PORT = 8080;
const hostname = '127.0.0.1';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://IgorBallo:6KbxHQMoxUo1PSHz@testnodecluster.i7pdwgm.mongodb.net/?retryWrites=true&w=majority";



// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test_db")
    .then(() => {
        console.log('Connexion à MongoDB réussie');
    })
    .catch((error) => {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        process.exit(1); // Arrêter l'application en cas d'erreur de connexion
    });


app.use(bodyParser.json()); // Pour gérer les données JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour gérer les données de formulaire

// Appel des routes
app.use('/api', require('./routes/api'));

// Gestionnaire d'erreurs générique
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


app.listen(PORT, () => {
    console.log(`Listening On http://${hostname}:${PORT}/api`);
})






