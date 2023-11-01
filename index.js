const express = require("express");
const app = express();
const cors = require('cors');
const config = require('./config/app.js');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const Joi = require('joi');


// Connexion à MongoDB
require("./app/helpers/mongodb")();

app.use(cors()); // Pour éviter les erreurs cors
app.use(bodyParser.json()); // Pour gérer les données JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour gérer les données de formulaire

// Configuration de express-fileupload
app.use(fileUpload());

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

// const options = {
//     failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Node Js API Description',
//             version: '1.0.0',
//             contact: {
//                 name: "Dr Hfx",
//                 email: "sodballo@gmail.com",
//                 url: "ballo.com"
//             },
//             "license": {
//                 "name": "Apache 2.0",
//                 "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
//             },
//         },
//         servers: [
//             {
//                 url: "http://localhost:8080/api"
//             }
//         ]
//     },
//     apis: ['./src/routes*.js'],
// };
//
// const spacs = swaggerjsdoc(options)
// app.use("/api",
//     swaggerui.serve,
//     swaggerui.setup(spacs)
// )

app.listen(port = config.app.port, () => {
    console.log(`Listening On http://${config.app.host_name}:${port}/api`);
})



