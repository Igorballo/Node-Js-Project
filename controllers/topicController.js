const express = require("express");
const router = express();

const getTopics = async (req, res) => {
   res.send("getTopics methods all succesfuly");
}

const getTopicsById = async (req, res) => {
    res.send(`getTopicsById ${req.params.id} methods all succesfuly`);
 }
module.exports = {getTopics, getTopicsById}