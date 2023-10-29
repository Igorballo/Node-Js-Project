const express = require("express");
const router = express();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


function generateRandomPassword(length) {
    const buffer = crypto.randomBytes(length / 2); // Divide by 2 since each byte generates 2 hex characters
    return buffer.toString('hex');
}

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
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                error: true,
                type: "error",
                message: "L'email et le mot de passe sont réquis."
            });
        }
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({
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

        const randomPassword = generateRandomPassword(6);

        const user = new User;
        user.username = req.body.username;
        user.email = req.body.email;
        user.avatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        user.password = await bcrypt.hash(randomPassword, 12);
        await user.save()

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'codebinary100@gmail.com',
                pass: 'ywyjhmffwqisxppq'
            }
        });

        const mailOptions = {
            from: 'Wazapou',
            to: req.body.email,
            subject: 'Bienvenue dans la communauté Wazapou!',
            html: `<p>Cher ${req.body.firstname},</p>
                    <p>Merci de rejoindre notre communauté !</p>
                    <p>Voici votre mot de passe pour vous connecter : <strong>${randomPassword}</strong></p>
                    <p>Cordialement,</p>
                    <p>L'équipe de Wazapou</p>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

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