const notifModel = require("../Models/notifModel");
const postModel = require("../Models/postModel");
const userModel = require("../models/userModel");

// creer un post
const createPostController = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message && !req.file) {
      return res.status(400).send({
        success: false,
        message: "Le message ou le media est obligatoire",
      });
    }

    let picture = "";
    let video = "";

    if (req.file) {
      if (req.file.mimetype.startsWith("image")) {
        picture = `/upload/images/posts/${req.file.filename}`;
      } else if (req.file.mimetype.startsWith("video")) {
        video = `/upload/videos/${req.file.filename}`;
      }
    }

    const newPost = new postModel({
      posterId: req.user._id,
      message,
      picture,
      video,
      likers: [],
      comments: [],
    });
    await newPost.save();
    res.status(201).send({
      success: true,
      message: "Post cree avec succes",
      post: newPost,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la creation du posts. API",
    });
  }
};

// recuperer tous les posts
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .populate("posterId", "-password")
      .populate("comments.commenterId", "name avatar")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Tous les posts",
      posts,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des posts. API",
    });
  }
};

// mettre a jour un post
const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouve",
      });
    }
    if (post.posterId.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "Acces interdit",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post mis a jour avec succes",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la modification du post. API",
    });
  }
};

// supprimer un post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouve",
      });
    }
    if (post.posterId.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "Acces interdit",
      });
    }
    await postModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Post supprime avec succes",
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la suppression du post. API",
    });
  }
};

// liker un post
const likePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // ou req.user._id

    // 1️⃣ vérifier le post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouvé",
      });
    }

    // 2️⃣ vérifier si déjà liké
    if (post.likers.includes(userId)) {
      return res.status(400).send({
        success: false,
        message: "Vous avez déjà liké ce post",
      });
    }

    // 3️⃣ ajouter le like au post
    post.likers.push(userId);
    await post.save();

    // 4️⃣ ajouter le post dans les likes du user
    await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { likes: postId } }, // évite les doublons
      { new: true }
    );

    if (post.posterId.toString() !== userId.toString()) {
      await notifModel.create({
        senderId: userId,
        receiverId: post.posterId,
        type: "like",
        postId: post._id
      })
    }

    res.status(200).send({
      success: true,
      message: "Post liké avec succès ",
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du like du post. API",
    });
  }
};

const unlikePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouvé",
      });
    }

    if (!post.likers.includes(userId)) {
      return res.status(400).send({
        success: false,
        message: "Vous n'avez pas liké ce post",
      });
    }

    post.likers.pull(userId);
    await post.save();

    await userModel.findByIdAndUpdate(userId, { $pull: { likes: postId } });

    res.status(200).send({
      success: true,
      message: "Like retiré avec succès",
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du unlike du post. API",
    });
  }
};

// commenter un post
const commentPostController = async (req, res) => {
  try {
    // entrées et validation
    const { id } = req.params;
    const { text } = req.body;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouvé",
      });
    }
    if (!text || !text.trim()) {
      return res.status(400).send({
        success: false,
        message: "Le texte du commentaire est obligatoire",
      });
    }

    // ajouter le commentaire
    const newComment = {
      commenterId: req.user._id,
      text,
      createdAt: new Date(),
    };
    post.comments.push(newComment);
    await post.save();

    await post.populate("comments.commenterId", "name avatar");
    // récupérer le commentaire ajouté (le dernier) déjà peuplé
    const populatedComment = post.comments[post.comments.length - 1];

    // notification
    if (post.posterId.toString() !== req.user._id.toString()) {
      await notifModel.create({
        senderId: req.user._id,
        receiverId: post.posterId,
        type: "comment",
        postId: post._id
      })
    }

    res.status(200).send({
      success: true,
      message: "Commentaire ajouté avec succès",
      comment: populatedComment,
      post,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du commentaire du post. API",
    });
  }
};

// edit comment post
const editCommentPostController = async (req, res) => {
  try {
    // entrees et validation
    const { id } = req.params; // post id
    const { commentId, text } = req.body;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouvé",
      });
    }

    // chercher le commentaire
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "Commentaire non trouvé",
      });
    }

    // vérifier si l'utilisateur est l'auteur du commentaire
    if (comment.commenterId.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    // modifier le commentaire
    comment.text = text;
    await post.save();

    res.status(200).send({
      success: true,
      message: "Commentaire modifié avec succès",
      post,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de l'édition du commentaire du post. API",
    });
  }
};

// delete comment post
const deleteCommentPostController = async (req, res) => {
  try {
    // entrees et validation
    const { id } = req.params; // post id
    const { commentId } = req.body;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post non trouvé",
      });
    }

    // chercher le commentaire
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: "Commentaire non trouvé",
      });
    }

    const userId = req.user._id;
    // autorisation : auteur du commentaire OU auteur du post
    const isCommentOwner = comment.commenterId.toString() === userId.toString();
    const isPostOwner = post.posterId.toString() === userId.toString();

    if (!isCommentOwner && !isPostOwner) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    // supprimer le commentaire
    comment.deleteOne()
    await post.save();

    res.status(200).send({
      success: true,
      message: "Commentaire supprimé avec succès",
      post,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la suppression du commentaire du post. API",
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  updatePostController,
  deletePostController,
  likePostController,
  unlikePostController,
  commentPostController,
  editCommentPostController,
  deleteCommentPostController,
};
