const express = require('express')
const { authMiddleware } = require('../Middlewares/authMiddlewares')
const { createMessageController, getAllMessageForChatController, markMessageAsReadController, getAllMessageNotReadController, getUnreadCountPerChatController } = require('../Controllers/messageController')

const router = express.Router()

// creer un message
router.post('/', authMiddleware, createMessageController)

// compter les messages non lues (total)
router.get('/unread-count', authMiddleware, getAllMessageNotReadController)

// compter les messages non lues par chat
router.get('/unread-per-chat', authMiddleware, getUnreadCountPerChatController)

// recuperer tous les messages d'un chat
router.get('/:chatId', authMiddleware, getAllMessageForChatController)

// marquer un message comme lue
router.patch('/read/:id', authMiddleware, markMessageAsReadController)

module.exports = router