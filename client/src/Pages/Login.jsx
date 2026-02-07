import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");
        console.log(email, password)

         try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      if (res.data.success) {
        // stocker token et user
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));

        // redirection vers home
        alert(res.data.message);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
      alert(err.response?.data?.message || "Erreur de connexion");
    }
    }

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
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[350px] h-[40px] bg-gray-100 pl-6 rounded focus:outline-none " placeholder="Entrer votre Email" />
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-[350px] h-[40px] bg-gray-100 pl-6 rounded focus:outline-none " placeholder="Entrer votre Mot de passe" />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button onClick={handleSubmit} className="w-[350px] h-[40px] bg-blue-500 text-white font-bold rounded">Se connecter</button>
          <p className="text-center text-blue-500">Vous n'avez pas de compte ?</p>
        </div>
        <div className="mt-4">
          <button className="w-[350px] h-[40px] bg-green-500 text-white font-bold rounded"><Link to="/register">Créer un nouveau compte</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
