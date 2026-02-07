const express = require('express')
const { authMiddleware } = require('../Middlewares/authMiddlewares')
const { createChatController, getUserChatController } = require('../Controllers/chatController')

const router = express.Router()

// creer un chat
router.post('/', authMiddleware, createChatController)

// recuperer les chats d'un user
router.get('/', authMiddleware, getUserChatController)

module.exports = router