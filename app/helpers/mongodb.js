const mongoose = require('mongoose');
const config = require('../../config/app');
const uri = config.db.mongodb.uri;
const init = () => {
    // Connexion à MongoDB
    mongoose.connect(uri)
        .then(() => {
            console.log('Connexion à MongoDB réussie');
        })
        .catch((error) => {
            console.error('Erreur lors de la connexion à MongoDB :', error);
            process.exit(1); // Arrêter l'application en cas d'erreur de connexion
        });
};

mongoose.Promise = global.Promise;

module.exports = init;
