const express = require('express')
const { createUserController, loginUserController, getAllUsersController, getInfoByIdUserController } = require('../Controllers/userController')
const { authMiddleware } = require('../Middlewares/authMiddlewares')

const router = express.Router()

// creation d'un nouvel utilisateur
router.post('/register', createUserController)

// connexion d'un utilisateur
router.post('/login', loginUserController)

// recuperation de tous les utilisateurs
router.get('/', authMiddleware, getAllUsersController)

// infos d'un utilisateur connecte
router.get('/get-info-user/:id', authMiddleware, getInfoByIdUserController)

module.exports = router