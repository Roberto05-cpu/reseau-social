const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../Utils/errors");
require('colors');

const createUserController = async (req,res) => {
    try {
        // recuperation et validation des donnees
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Veuillez remplir tous les champs"
            })
        }

        // verification si l'email existe
        const existing = await userModel.findOne({email})
        if (existing) {
            return res.status(400).send({
                success: false,
                message: "Cet email existe deja"
            })
        }

         // hasher le mot de passe
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // enregistrer le user
        const user = await userModel.create({
            name,
            email,
            password : hashedPassword,
        })

        // reponse
        res.status(201).send({
            success: true,
            message: "utilisateur cree avec success",
            user
        })
    } catch (error) {
        const errors = signUpErrors(error);
        console.log(error.message.bgRed.white)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la creation de l'utilisateur. API",
            errors
        })
    }
}

const loginUserController = async (req,res) => {
    try {
        // validation des donnees
        const {email, password} = req.body
         if (!email || !password) {
           return res.status(400).send({
             success: false,
             message: "Entrez l'email et votre mot de passe",
            });
        }

        //  verification de l'email
         const user = await userModel.findOne({ email });
        if (!user) {
           return res.status(404).send({
             success: false,
             message: "Utilisateur introuvable",
           });
        }

         // comparaison du mot de passe 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           return res.status(401).send({
             success: false,
             message: "Votre mot de passe est incorrect",
           });
        }

        // generer in token
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
           expiresIn: "7d",
        });
        user.password = undefined;

         // reponse
        res.status(201).send({
            success: true,
            message:  "Utilisateur connecté avec succès 👤",
            token,
            user
        })
    } catch (error) {
        const errors = signInErrors(error);
        console.log(error.message.bgRed.white)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la connexion de l'utilisateur. API",
            errors
        })
    }
}

const getAllUsersController = async (req, res) => {
    try {
        // recuperer tous les users
        const users = await userModel.find().select("-password");
        res.status(200).send({
            success: true,
            message: "Tous les utilisateurs récupérés avec succès",
            users
        });
    } catch (error) {
        console.log(error.message.bgRed.white)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la récupération des utilisateurs. API",
        })
    }
}

const getInfoByIdUserController = async (req,res) => {
    const userId = req.params.id;
    
    try {
        // recherche user par son id
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Utilisateur introuvable",
            });
        }

        // reponse
        res.status(200).send({
            success: true,
            message: "Informations de l'utilisateur récupérées avec succès",
            user
        })
    } catch (error) {
        console.log(error.message.bgRed.white)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la récupération des informations de l'utilisateur. API",
        })
    }
}

module.exports = {createUserController, loginUserController, getAllUsersController, getInfoByIdUserController}