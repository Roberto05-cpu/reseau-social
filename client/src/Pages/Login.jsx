import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center gap-5 h-screen bg-gray-200">
      <div>
        <h1 className="text-blue-500 text-6xl">Instagram</h1>
        <p className="text-4xl mt-3">
          Avec Instagram, partagez vos moments <br /> avec vos amis et votre famille.
        </p>
      </div>
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <div className="flex flex-col gap-5 pb-5 border-b border-gray-300">
          <input type="email" className="w-[350px] h-[40px] bg-gray-100 pl-6 rounded focus:outline-none " placeholder="Entrer votre Email" />
          <input type="password" className="w-[350px] h-[40px] bg-gray-100 pl-6 rounded focus:outline-none " placeholder="Entrer votre Mot de passe" />
          <button className="w-[350px] h-[40px] bg-blue-500 text-white font-bold rounded">Se connecter</button>
          <p className="text-center text-blue-500">Vous n'avez pas de compte ?</p>
        </div>
        <div>
          <button className="w-[350px] h-[40px] bg-green-500 text-white font-bold rounded"><Link to="/register">Créer un nouveau compte</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
