const express = require("express");
const router = express();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.json({
            error: false,
            type: "success",
            message: "Users retrieved successfully",
            users: users
        });
    } catch (e) {
        return res.json({
            error: true,
            type: "error",
            message: e.toString()
        }, 500);
    }
}

const getUsersById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({
                error: true,
                type: "error",
                message: "User non trouvé"
            });
        }

        return res.status(200).json({
            error: false,
            type: "success",
            message: "User récupéré avec succès",
            user: user
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            type: "error",
            message: e.toString()
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                error: true,
                type: "error",
                message: "Utilisateur ou mot de passe incorrect"
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                type: "error",
                message: "Mot de passe incorrect"
            });
        }

        // Créer un nouvel objet utilisateur sans inclure le champ "password"
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        // Le mot de passe est valide, générer un jeton d'authentification
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });


        return res.status(200).json({
            error: false,
            type: "success",
            message: "Connexion réussie",
            user: userWithoutPassword,
            token: token

        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            type: "error",
            message: e.toString()
        });
    }
};

const saveUsers = async (req, res) => {
    try {
        // Vérifier si l'utilisateur existe déjà avec l'email fourni
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                error: true,
                type: 'error', message: 'Un utilisateur avec cet email existe déjà.'
            });
        }

        if (req.body.password !== req.body.confirmedpassword) {
            return res.json({
                error: true,
                type: "error",
                message: "Le mot de passe et la confirmation doivent etre identiques"
            }, 500);
        }
        if (req.body.password.length < 6) {
            return res.status(400).json({
                error: true,
                type: 'error',
                message: 'Le mot de passe doit comporter au moins 6 caractères',
            });
        }

        const user = new User;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.age = req.body.age;
        user.email = req.body.email;
        user.password = await bcrypt.hash(req.body.password, 12);
        await user.save()

        return res.json({
            error: false,
            type: "success",
            message: "Utilisateur enrégstré avec succès",
            user: user
        });
    } catch (e) {
        return res.json({
            error: true,
            type: "error",
            message: e.toString()
        }, 500);
    }
}
module.exports = { getUsers, getUsersById, saveUsers, login }