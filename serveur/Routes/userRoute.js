const express = require('express')
const { createUserController, loginUserController, getAllUsersController, getInfoByIdUserController, deleteUserController, updateUserController, followUserController, unfollowUserController, uploadAvatarController } = require('../Controllers/userController')
const { authMiddleware } = require('../Middlewares/authMiddlewares')
const upload = require('../Middlewares/upload')

const router = express.Router()

// creation d'un nouvel utilisateur
router.post('/register', createUserController)

// connexion d'un utilisateur
router.post('/login', loginUserController)

// recuperation de tous les utilisateurs
router.get('/', authMiddleware, getAllUsersController)

// infos d'un utilisateur connecte
router.get('/get-info-user', authMiddleware, getInfoByIdUserController)

// mettre a jour le profil d'un utilisateur
router.put('/:id', authMiddleware, updateUserController)

// supprimer un utilisateur
router.delete('/:id', authMiddleware, deleteUserController)

// s'abonner a un utilisateur
router.patch('/follow/:id', authMiddleware, followUserController)

// desabonner d'un utilisateur
router.patch('/unfollow/:id', authMiddleware, unfollowUserController)

// uploader une image de profil
router.put('/avatar/:id', authMiddleware, upload.single('avatar'),(req, res, next) => {
      console.log("La route upload-avatar est appelée !");
      console.log("req.body:", req.body);
      console.log("req.file:", req.file);
      next();
  }, uploadAvatarController)

module.exports = router