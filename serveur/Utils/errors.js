module.exports.signUpErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message.includes("name"))
    errors.name = "Nom manquant, incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email manquant ou incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
    errors.name = "Ce nom est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Email manquant ou inconnu";
  
  if (err.message.includes('password'))
    errors.password = "Le mot de passe manquant ou ne correspond pas"

  return errors;
}