const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    // Vérifie que le header Authorization existe et commence par "Bearer "
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Accès refusé. Aucun token fourni.",
      });
    }

    // Récupère le token
    const token = authHeader.split(" ")[1];

    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupère l'utilisateur correspondant au token
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    // Ajoute les infos de l'utilisateur à la requête
    req.user = user;

    // Passe au prochain middleware / contrôleur
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};

module.exports = {authMiddleware};
