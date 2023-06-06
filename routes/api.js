const express = require("express");
const router = express();


const {getTopics, getTopicsById} = require('../controllers/topicController');

router.get('/topics', getTopics);
router.get('/topics/:id', getTopicsById);

module.exports = router
