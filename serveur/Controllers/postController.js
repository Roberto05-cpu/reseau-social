const postModel = require("../Models/postModel")

// creer un post
const createPostController = async (req,res) => {
    try {
        const {message} = req.body
        if (!message) {
            return res.status(400).send({
                success: false,
                message: "Le message est obligatoire",
            })
        }

        const newPost = new postModel({
            posterId: req.user._id,
            message,
            picture: req.body.picture,
            video: req.body.video,
            likers: [],
            comments: [],
        })
        await newPost.save()
        res.status(201).send({
            success: true,
            message: "Post cree avec succes",
            post: newPost,
        })
    } catch (error) {
         console.log(error.message.bgRed.white)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la creation du posts. API",
        })
    }
}

// recuperer tous les posts
const getAllPostsController = async (req,res) => {
    try {
        const posts = await postModel.find({}).populate("posterId","-password").sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "Tous les posts",
            posts,
        })
    } catch (error) {
        console.log(error.message.bgRed.white)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la recuperation des posts. API",
        })
    }
}

// mettre a jour un post
const updatePostController = async (req,res) => {

}

// supprimer un post
const deletePostController = async (req,res) => {}

module.exports = {createPostController, getAllPostsController, updatePostController, deletePostController};