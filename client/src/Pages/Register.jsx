import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, gender, date)

    axios.post('http://localhost:5000/api/users/register', {name, email, password, gender, date})
     .then(res => {
      console.log("reponse :", res.data)
      if (res.data.success) {
        alert(res.data.message)
        setName('')
        setEmail('')
        setPassword('')
        setGender('')
        setDate()

        navigate('/login')
      }
     })
     .catch(err => {
      alert(err.response?.data?.message, err.response.data.errors)
     })
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 h-screen">
      <h1 className="mt-5 text-5xl text-blue-500 font-bold">Instagram</h1>
      <div className="bg-white mt-5 h-[88vh] rounded-[10px] p-5">
        <div className="text-center pb-5 border-b border-b-gray-400">
          <h2 className="text-3xl font-bold">Créer un compte</h2>
          <p>C'est simple et rapide</p>
        </div>
        <form className="mt-5">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[98%] h-[40px] pl-5 border rounded-[5px] focus:outline-none"
            placeholder="Entrer votre nom"
          />
          <div className="mt-2">
            <label htmlFor="">Date de naissance</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[98%] h-[40px] pl-5 border rounded-[5px] focus:outline-none mt-2"
              placeholder="JJ/MM/AAAA"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="">Genre</label>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2 items-center w-[21%] border h-[40px] rounded-[5px] pl-3">
                <p className="text-[18px]">Femme</p>
                <input
                  type="radio"
                  value="Femme"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "Femme"}
                  className="p-5"
                  id=""
                />
              </div>
              <div className="flex gap-2 items-center w-[21%] border h-[40px] rounded-[5px] pl-3 mr-2">
                <p className="text-[18px]">Homme</p>
                <input
                  type="radio"
                  value="Homme"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "Homme"}
                  className="p-5"
                  id=""
                />
              </div>
            </div>
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[98%] h-[40px] pl-5 border rounded-[5px] focus:outline-none mt-3"
            placeholder="Entrer votre Email"
          />
          <input
            type="password"
            name="password"
            min={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[98%] h-[40px] pl-5 border rounded-[5px] focus:outline-none mt-3"
            placeholder="Entrer votre mot de passe"
          />
        </form>
        <div className="mt-3">
          <p className="text-[14px]">
            Les personnes qui utilisent notre service ont pu importer vos
            coordonnées sur <br />
            Facebook. <span className="text-blue-500">En savoir plus.</span>
          </p>
          <p className="text-[14px]">
            En cliquant sur s'inscrire, vous acceptez nos{" "}
            <span className="text-blue-500">Conditions générales</span>, notre{" "}
            <br />{" "}
            <span className="text-blue-500">politique de confidentialité</span>{" "}
            et notre{" "}
            <span className="text-blue-500">
              Politique d'utilisation des cookies
            </span>
            . Vous <br /> recevrez peut etre des notifications par SMS de notre
            part et vous pouvez à tout <br /> moment vous désabonner.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="py-2 px-10 bg-green-700 text-white font-bold rounded-[5px] cursor-pointer"
          >
            S'inscrire
          </button>
          <p className="text-blue-500 cursor-pointer">
            Vous avez deja un compte ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
