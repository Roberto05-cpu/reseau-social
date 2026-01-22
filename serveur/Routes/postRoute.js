const express = require("express");
const { authMiddleware } = require("../Middlewares/authMiddlewares");
const { createPostController, getAllPostsController, updatePostController, deletePostController } = require("../Controllers/postController");
const upload = require("../Middlewares/upload");

const router = express.Router();

// creer un post
router.post('/', authMiddleware, upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createPostController)

// recuperer tous les posts
router.get('/', authMiddleware, getAllPostsController)

// mettre a jour un post
router.put('/:id', authMiddleware, updatePostController)

// supprimer un post
router.delete('/:id', authMiddleware, deletePostController)

module.exports = router;