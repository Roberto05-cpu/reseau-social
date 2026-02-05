import React, { useContext, useEffect, useState } from "react";
import { Home, LogOut, Podcast, Settings, User, Video } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import insta from "../assets/logoinsta.png";
import { ReseauContext } from "../Context/ReseauContext";
import axios from "axios";
import { socket } from "../socket";

const ProfilSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  const { user, setUser, token } = useContext(ReseauContext);
  const [userPosts, setUserPosts] = useState([]);

  // Initialisation socket une seule fois
  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id);

    socket.on("updateFollowers", ({ userId, followersCount }) => {
      if (userId === user._id) {
        setUser((prev) => ({
          ...prev,
          followersCount, // ajouter un champ temporaire pour le compteur
        }));
      }
    });

    socket.on("updateFollowing", ({ userId, followingCount }) => {
      if (userId === user._id) {
        setUser((prev) => ({
          ...prev,
          followingCount,
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const logOut = () => {
    sessionStorage.clear();
    alert("Deconnexion de l'utilisateur");
    navigate("/login");
  };

  const getPostByUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/get-info-user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserPosts(res.data.userPosts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostByUser();
  }, [token]);

  return (
    <div className="max-h-screen h-screen overflow-y-hidden p-5">
      {/* Header */}
      <div className="flex items-center gap-1">
        <img src={insta} className="w-10 h-10" alt="" />
        <h1 className="text-2xl momo-signature-regular">Instagram</h1>
      </div>

      {/* Avatar et infos */}
      <div className="mt-6 flex flex-col items-center gap-1 justify-center">
        {user?.avatar ? (
          <img
            src={`http://localhost:5000${user.avatar}`}
            className="w-20 h-20 rounded-full object-cover"
            alt=""
          />
        ) : (
          <User size={80} />
        )}
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-[17px]">{user?.name}</h3>
          <p className="text-[14px] opacity-80">{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 grid grid-rows-2">
        <div className="flex items-center justify-center gap-9">
          <p className="font-bold">{userPosts.length}</p>
          <div>|</div>
          <p className="font-bold">{user.followersCount ?? user.followers.length ?? 0}</p>
          <div>|</div>
          <p className="font-bold">{user.followingCount ?? user.following.length ?? 0}</p>
        </div>
        <div className="w-full flex items-center justify-center gap-10 mt-1">
          <p>Posts</p>
          <p>Followers</p>
          <p>Following</p>
        </div>
      </div>

      {/* Bio */}
      <div className="ml-1 mt-5">
        <p className="font-semibold">{user?.name}</p>
        <p>
          {user?.bio ? (
            user.bio
          ) : (
            <span className="opacity-50">Pas de bio</span>
          )}
        </p>
      </div>

      {/* Navigation */}
      <div className="ml-1 mt-6">
        <ul className="flex flex-col gap-5">
          <li
            className={`flex gap-3 ${current === "/home/feed" ? "font-bold text-blue-500" : "hover:underline"}`}
          >
            <Home />
            <Link to="/home/feed"> Feed</Link>
          </li>
          <li
            className={`flex gap-3 ${current === "/home/reel" ? "font-bold text-blue-500" : "hover:underline"}`}
          >
            <Video />
            <Link to="/home/reel"> Reels</Link>
          </li>
          <li
            className={`flex gap-3 ${current === "/home/my-post" ? "font-bold text-blue-500" : "hover:underline"}`}
          >
            <Podcast />
            <Link to="/home/my-post"> My Posts</Link>
          </li>
          <li
            className={`flex gap-3 ${current === "/home/setting" ? "font-bold text-blue-500" : "hover:underline"}`}
          >
            <Settings />
            <Link to="/home/setting"> Settings</Link>
          </li>
          <li onClick={logOut} className="flex gap-3 mt-15 cursor-pointer">
            <LogOut /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilSidebar;
