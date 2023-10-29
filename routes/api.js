const express = require("express");
const router = express();

const productController = require('../app/controllers/productController');
const topicController = require('../app/controllers/topicController');
const userController = require('../app/controllers/userController');

router.get('/', (req, res) => {
    res.send("Home page hit successfully")
});

//Topics routes
router.get('/topics', topicController.getTopics);
router.get('/topics/:id', topicController.getTopicsById);
router.post('/topics', topicController.saveTopics);

//Product routes
router.get('/products', productController.getProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProducts);
router.delete('/products/:id', productController.deleteProducts);
router.post('/products', productController.saveProducts);

//Users routes
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUsersById);
router.post('/auth/register', userController.saveUsers);
router.post('/auth/login', userController.login);

module.exports = router
