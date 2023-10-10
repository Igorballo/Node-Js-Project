const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Topic = require('../models/topic');

const getTopics = async (req, res) => {
   try {
      const topics = await Topic.find();

      return res.json({
         error: false,
         type: "success",
         message: "Topics retrieved successfully",
         topics: topics
      });
   } catch (e) {
      return res.json({
         error: true,
         type: "error",
         message: e.toString()
      }, 500);
   }
}

const getTopicsById = async (req, res) => {
   try {
      const topic = await Topic.findOne({ _id: req.params.id });

      if (!topic) {
         return res.status(404).json({
            error: true,
            type: "error",
            message: "Topic non trouvé"
         });
      }

      return res.status(200).json({
         error: false,
         type: "success",
         message: "Topic récupéré avec succès",
         topic: topic
      });
   } catch (e) {
      return res.status(500).json({
         error: true,
         type: "error",
         message: e.toString()
      });
   }
};

const saveTopics = async (req, res) => {
   try {
      console.log(req.body)
      const topic = new Topic;
      topic.title = req.body.title;
      topic.subject = req.body.subject;
      topic.status = req.body.status;
      topic.save()

      if (req.body.status === '') {
         topic.status = false;
      } else {
         topic.status = true;
      }

      return res.json({
         error: false,
         type: "success",
         message: "Topic enrégstré avec succès",
         topic: topic
      });
   } catch (e) {
      return res.json({
         error: true,
         type: "error",
         message: e.toString()
      }, 500);
   }

}
module.exports = { getTopics, getTopicsById, saveTopics }