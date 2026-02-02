import React, { useState } from "react";
import { Edit } from "lucide-react";
import axios from "axios";
import defautuser from "../assets/defautuser.png";

const Settings = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    user.avatar ? `http://localhost:5000${user.avatar}` : defautuser,
  );
  const [bio, setBio] = useState(user.bio || "");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // preview avant upload
  };

  const uploadAvatar = async () => {
    if (!file) return alert("Sélectionne un fichier avant de télécharger !");

    const formData = new FormData();
    formData.append("avatar", file);

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/avatar/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      alert("Avatar mis à jour avec succès !");
      // Mettre à jour sessionStorage pour que React réaffiche le nouvel avatar
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'upload de l'avatar.");
    }
  };

  const handleBioChange = (e) => setBio(e.target.value);

  const updateBio = async () => {
    if (bio === (user.bio || ""))
      return alert("Aucune modification à enregistrer.");

    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        { bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Bio mise à jour avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour de la bio.");
    }
  };

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto flex justify-center items-center">
      <div className="w-[900px] h-[80vh] bg-white rounded-[20px] p-5">
        <h1 className="text-3xl font-bold text-center">Mon profil</h1>

        {/* Avatar + Preview */}
        <div className="flex items-center gap-5 mt-5">
          <img
            src={preview}
            className="w-20 h-20 rounded-full object-cover"
            alt="avatar"
          />
          <div className="flex flex-col gap-2">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button
              onClick={uploadAvatar}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Mettre à jour l'avatar
            </button>
          </div>
          <div>
            <p className="font-bold">{user.name}</p>
            <span>{user.email}</span>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="mt-10">
          <h2 className="font-bold text-[20px]">Informations personnelles</h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <p className="opacity-65">Nom d'utilisateur</p>
              <span className="font-bold">{user.name}</span>
            </div>
            <div>
              <p className="opacity-65">Genre</p>
              <span className="font-bold">{user.gender}</span>
            </div>
            <div>
              <p className="opacity-65">Adresse e-mail</p>
              <span className="font-bold">{user.email}</span>
            </div>
            <div>
              <p className="opacity-65">Date de naissance</p>
              <span className="font-bold">{user.date}</span>
            </div>
            <div className="mt-4 flex items-center gap-5">
              <div>
                <p className="opacity-65">Bio</p>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className="w-[300px] p-2 border rounded mt-2"
                  rows={4}
                  placeholder="Présente-toi en quelques mots..."
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={updateBio}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Enregistrer la bio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
