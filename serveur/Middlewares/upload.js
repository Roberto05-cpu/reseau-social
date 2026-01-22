const multer = require("multer");
const path = require("path");

// stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      if (file.fieldname === "avatar") {
        cb(null, "upload/images/profils");
      } else if (file.fieldname === "picture") {
        cb(null, "upload/images/posts");
      } else {
        cb(new Error("champ image non reconnu"));
      }
    } else if (file.mimetype.startsWith("video")) {
      cb(null, "upload/videos");
    } else {
      cb(new Error("Type de fichier non autorisé"));
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s/g, "")
    );
  },
});

// filtre
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images et vidéos sont autorisées"));
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});
