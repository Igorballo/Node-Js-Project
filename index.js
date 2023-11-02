const express = require("express");
const app = express();
const cors = require('cors');
const config = require('./config/app.js');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const options = require('./docs/swagger');
const Product = require('./app/models/product');


// Connexion à MongoDB
require("./app/helpers/mongodb")();

app.use(cors()); // Pour éviter les erreurs cors
app.use(bodyParser.json()); // Pour gérer les données JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour gérer les données de formulaire

// app.post('/api/topics', (req, res) => {
//     console.log(req.body)
// })

app.get('/', (req, res) => {
    res.send("Home page hit successfully")
});

// app.get('/api/products', async (req, res) => {
//     try {
//         console.log("igor")
//         const products = await Product.find().exec(); // Utilisez `await` pour attendre que la requête MongoDB se termine
//         return res.json({
//             error: false,
//             type: "success",
//             message: "Product retrieved successfully",
//             products: products
//         });
//     } catch (e) {
//         return res.status(500).json({
//             error: true,
//             type: "error",
//             message: e.toString()
//         });
//     }
// });

// Appel des routes
app.use('/api', require('./routes/api'));

// Configuration de express-fileupload
app.use(fileUpload());


// Gestionnaire d'erreurs générique
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const spacs = swaggerjsdoc(options)
app.use("/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs),
)

app.listen(port = config.app.port, () => {
    console.log(`Listening On http://${config.app.host_name}:${port}/api`);
    console.log(`Discover the API description On http://${config.app.host_name}:${port}/api-docs`);
})



