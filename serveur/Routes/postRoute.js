const express = require("express");
const { authMiddleware } = require("../Middlewares/authMiddlewares");
const { createPostController, getAllPostsController, updatePostController, deletePostController, likePostController, unlikePostController, commentPostController, editCommentPostController, deleteCommentPostController } = require("../Controllers/postController");
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

// liker un post
router.patch('/like/:id', authMiddleware, likePostController)

// unliker un post
 router.patch('/unlike/:id', authMiddleware, unlikePostController)

 // commenter un post
router.patch('/comment-post/:id', authMiddleware, commentPostController)

 //edit comment post
router.patch('/edit-comment-post/:id', authMiddleware, editCommentPostController)

 // delete comment post
router.patch('/delete-comment-post/:id', authMiddleware, deleteCommentPostController)

module.exports = router;