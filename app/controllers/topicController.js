const express = require("express");
const Topic = require('../models/topic');
const { uploadFile } = require('../helpers/fileUpload')
const path = require('path');

const savePost = async (req, res) => {
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Aucun fichier n\'a été téléchargé.');
   }
   try {
      const file = req.files.image;
      const destinationPath = path.resolve(__dirname, '../../storage/images');
      const uniqueFilename = await uploadFile(file, destinationPath);

      res.send("Fichier téléchargé : " + uniqueFilename);
   } catch (error) {
      res.status(500).send('Erreur lors du téléchargement du fichier : ' + error.message);
   }
}

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
      // Crée un nouvel objet Topic avec les données de la requête
      const topic = new Topic({
         title: req.body.title,
         subject: req.body.subject,
         status: req.body.status === '' ? false : req.body.status,
      });

      // Valide l'objet Topic
      const validationError = topic.validateSync();

      if (validationError) {
         // S'il y a des erreurs de validation, renvoyez-les en tant que réponse d'erreur
         return res.status(400).json({
            error: true,
            type: "error",
            message: validationError.errors,
         });
      }

      // Si la validation réussit, enregistrez l'objet Topic dans la base de données
      const savedTopic = await topic.save();

      return res.status(201).json({
         error: false,
         type: "success",
         message: "Topic enregistré avec succès",
         topic: savedTopic,
      });
   } catch (e) {
      // En cas d'erreur inattendue, renvoyez une réponse d'erreur avec le message d'erreur
      return res.status(500).json({
         error: true,
         type: "error",
         message: e.toString(),
      });
   }
}

module.exports = { getTopics, getTopicsById, saveTopics, savePost }