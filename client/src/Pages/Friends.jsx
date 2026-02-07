import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import axios from "axios";
import defautuser from "../assets/defautuser.png";
import { useContext } from "react";
import { ReseauContext } from "../Context/ReseauContext";

const Friends = () => {
  const token = sessionStorage.getItem("token");

  const currentUser = JSON.parse(sessionStorage.getItem("user")) || null;

  const [allUsers, setAllUsers] = useState([]);
  //const [followingIds, setFollowingIds] = useState([])

  const {getUnreadNotifCount} = useContext(ReseauContext)

  const getAllUser = () => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setAllUsers(res.data.selectUsers);
        // sync followingIds with latest session user if available
      })
      .catch((err) => {
        console.error("Erreur lors de la recuperation des utilisateurs", err);
      });
  };

  const isFollowing = (userId) => {
    return currentUser?.following?.includes(userId);
  };

  const toggleFollow = async (userId) => {
    try {
      const url = isFollowing(userId)
        ? `http://localhost:5000/api/users/unfollow/${userId}`
        : `http://localhost:5000/api/users/follow/${userId}`;

      const res = await axios.patch(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      //  Mise à jour persistante
      sessionStorage.setItem("user", JSON.stringify(res.data.currentUser));

      getAllUser(); // refresh users list
      getUnreadNotifCount()
    } catch (err) {
      console.error("Erreur follow/unfollow", err);
      alert(err.response?.data?.message || "Erreur");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <h2 className="font-bold text-2xl">Recherche des amis</h2>
      <div className="grid grid-cols-3 gap-5">
        {allUsers.map((user, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 mt-5 p-3 bg-white rounded-lg"
          >
            <div>
              <img
                src={
                  user.avatar
                    ? `http://localhost:5000${user.avatar}`
                    : defautuser
                }
                className="mx-auto w-[390px] h-[390px] object-cover rounded-[5px]"
                alt=""
              />
              <p className="text-center font-bold">{user.name}</p>
            </div>
            <button
              onClick={() => toggleFollow(user._id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white
    ${isFollowing(user._id) ? "bg-gray-400" : "bg-blue-500"}
  `}
            >
              <UserCircle className="w-5 h-5" />
              {isFollowing(user._id) ? "Suivi(e)" : "Ajouter ami(e)"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
