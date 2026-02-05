const express = require('express')
const { authMiddleware } = require('../Middlewares/authMiddlewares')
const { getMyNotifController, markAllReadNotifController, countUnReadNotifsController } = require('../Controllers/notifController')

const router = express.Router()

// recuperer notif user connecte
router.get('/', authMiddleware, getMyNotifController)

// marquer les notifs comme lues
router.patch('/read-all', authMiddleware, markAllReadNotifController)

// compter les notifs non lues
router.get('/unread-count', authMiddleware, countUnReadNotifsController)


module.exports = router