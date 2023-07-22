const express = require("express");
const router = express();


const {getTopics, getTopicsById, saveTopics} = require('../controllers/topicController');
const {getUsers, getUsersById, saveUsers, login} = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send("Home page hit successfully")
});

//Topics routes
router.get('/topics', getTopics);
router.get('/topics/:id', getTopicsById);
router.post('/topics', saveTopics);

//Users routes
router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/register', saveUsers);
router.post('/login', login);

module.exports = router
