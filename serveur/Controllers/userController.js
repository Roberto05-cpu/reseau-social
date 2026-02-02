const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../Utils/errors");
const postModel = require("../Models/postModel");
require("colors");

const createUserController = async (req, res) => {
  try {
    // recuperation et validation des donnees
    const { name, email, password, gender, date } = req.body;
    if (!name || !email || !password || !gender || !date) {
      return res.status(400).send({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    // verification si l'email existe
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Cet email existe deja",
      });
    }

    // hasher le mot de passe
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // enregistrer le user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      gender,
      date,
    });

    // reponse
    res.status(201).send({
      success: true,
      message: "utilisateur cree avec success",
      user,
    });
  } catch (error) {
    const errors = signUpErrors(error);
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la creation de l'utilisateur. API",
      errors,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    // validation des donnees
    const { email, password } = req.body;
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
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    user.password = undefined;

    // reponse
    res.status(201).send({
      success: true,
      message: "Utilisateur connecté avec succès 👤",
      token,
      user,
    });
  } catch (error) {
    const errors = signInErrors(error);
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la connexion de l'utilisateur. API",
      errors,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    // recuperer tous les users
    const users = await userModel.find().select("-password");
    const selectUsers = users.filter(user => user.id !== req.user.id)
    res.status(200).send({
      success: true,
      message: "Tous les utilisateurs récupérés avec succès",
      selectUsers,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la récupération des utilisateurs. API",
    });
  }
};

const getInfoByIdUserController = async (req, res) => {
  try {
    // utiliser l'utilisateur connecté (authMiddleware remplit req.user)
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    // récupérer les informations utilisateur (sans le password)
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    // récupérer tous les posts de l'utilisateur connecté
    const userPosts = await postModel
      .find({ posterId: userId })
      .populate("posterId", "name avatar")
      .sort({ createdAt: -1 });

    // réponse
    res.status(200).send({
      success: true,
      message: "Informations et posts de l'utilisateur récupérés avec succès",
      user,
      userPosts,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message:
        "Erreur lors de la récupération des informations de l'utilisateur. API",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bio } = req.body;

    if (!userId) {
      return res.status(404).send({
        success: false,
        message: "Faut entrer l'id de l'utilisateur",
      });
    }

    // recherche de l'utilisateur
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    // mise a jour
    if (bio) user.bio = bio;

    await user.save();

    res.status(201).send({
      success: true,
      message: "Profil utilisateur mis a jour",
      user,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la mise a jour des infos de l'utilisateur. API",
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).send({
        success: false,
        message: "Faut entrer l'id de l'utilisateur",
      });
    }

    // recherche et suppression
    await userModel.findByIdAndDelete(userId);

    res.status(201).send({
      success: true,
      message: "Profil Utilisateur supprimé",
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la suppression de l'utilisateur. API",
    });
  }
};

// s'abonner a un utilisateur
const followUserController = async (req, res) => {
  try {
    const userIdToFollow = req.params.id;
    const currentUserId = req.user.id;

    // recherche de l'utilisateur a suivre
    const userToFollow = await userModel.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur a suivre introuvable",
      });
    }

    // recherche de l'utilisateur courant
    const currentUser = await userModel.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur courant introuvable",
      });
    }

    // verification si l'utilisateur est deja suivi
    const isAlreadyFollowing = currentUser.following.includes(userIdToFollow);
    if (isAlreadyFollowing) {
      return res.status(400).send({
        success: false,
        message: "Vous suivez deja cet utilisateur",
      });
    }

    // ajout de l'utilisateur dans la liste des abonnements
    currentUser.following.push(userIdToFollow);
    await currentUser.save();

    // ajout de l'utilisateur dans la liste des abonnés
    userToFollow.followers.push(currentUserId);
    await userToFollow.save();

    res.status(201).send({
      success: true,
      message: "Abonnement reussi",
      userToFollow,
      currentUser
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de l'abonnement de l'utilisateur. API",
    });
  }
};

// se desabonner d'un utilisateur
const unfollowUserController = async (req, res) => {
  try {
    const userIdToUnfollow = req.params.id;
    const currentUserId = req.user._id;

    // recherche de l'utilisateur suivi
    const userToUnfollow = await userModel.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur suivi introuvable",
      });
    }

    // recherche de l'utilisateur courant
    const currentUser = await userModel.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur courant introuvable",
      });
    }

    // verification si l'utilisateur est deja suivi
    const isAlreadyFollowing = currentUser.following.includes(userIdToUnfollow);
    if (!isAlreadyFollowing) {
      return res.status(400).send({
        success: false,
        message: "Vous ne suivez pas cet utilisateur",
      });
    }

    // suppression de l'utilisateur dans la liste des abonnements
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userIdToUnfollow
    );
    await currentUser.save();

    // suppression de l'utilisateur dans la liste des abonnés
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    await userToUnfollow.save();

    res.status(201).send({
      success: true,
      message: "Desabonnement reussi",
      userToUnfollow,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du desabonnement de l'utilisateur. API",
    });
  }
};

// uploader une image de profil
const uploadAvatarController = async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.file);

  try {
    const userId = req.params.id;
    if (userId !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "Vous n'êtes pas autorisé à modifier ce profil",
      });
    }
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Aucun fichier téléchargé",
      });
    }

    // mise a jour de l'avatar de l'utilisateur
    const avatarPath = req.file
      ? `/upload/images/profils/${req.file.filename}`
      : "";
    const user = await userModel
      .findByIdAndUpdate(userId, { avatar: avatarPath }, { new: true })
      .select("-password");

    res.status(201).send({
      success: true,
      message: "Image de profil téléchargée avec succès",
      user,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du téléchargement de l'image de profil. API",
    });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
  getInfoByIdUserController,
  deleteUserController,
  updateUserController,
  followUserController,
  unfollowUserController,
  uploadAvatarController,
};
