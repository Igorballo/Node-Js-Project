const express = require("express");
const router = express();


const {getProduct, updateProducts, getProductById, deleteProducts, saveProducts} = require('../controllers/productController');
const {getTopics, getTopicsById, saveTopics} = require('../controllers/topicController');
const {getUsers, getUsersById, saveUsers, login} = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send("Home page hit successfully")
});

//Topics routes
router.get('/topics', getTopics);
router.get('/topics/:id', getTopicsById);
router.post('/topics', saveTopics);

//Product routes
router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);
router.post('/products', saveProducts);

//Users routes
router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/auth/register', saveUsers);
router.post('/auth/login', login);

module.exports = router
