import React, { useContext, useEffect, useState } from "react";
import manofsteel from "../assets/manofsteel.jpg";
import { Home, LogOut, Podcast, Settings, User, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import insta from "../assets/logoinsta.png";
import { ReseauContext } from "../Context/ReseauContext";
import axios from "axios";

const ProfilSidebar = () => {
  const navigate = useNavigate();

  const { user, token } = useContext(ReseauContext);

  const [userPosts, setUserPosts] = useState([]);

  const logOut = () => {
    sessionStorage.clear();
    alert("Deconnexion de l'utilisateur");
    navigate("/login");
  };

  const getPostByUser = async () => {
    axios
      .get(`http://localhost:5000/api/users/get-info-user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setUserPosts(res.data.userPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostByUser();
  }, [])

  return (
    <div className="max-h-screen h-screen overflow-y-hidden p-5">
      <div className="flex items-center gap-1">
        <img src={insta} className="w-10 h-10" alt="" />
        <h1 className=" text-2xl momo-signature-regular">Instagram</h1>
      </div>
      <div className="mt-6">
        <div className="flex flex-col items-center gap-1 justify-center">
          {user.avatar ? (
            <img
              src={`http://localhost:5000${user.avatar}`}
              className="w-20 h-20 rounded-[50%] object-cover"
              alt=""
            />
          ) : (
            <User size={80} />
          )}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold text-[17px]">{user.name}</h3>
            <p className="text-[14px] opacity-80">{user.email}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-rows-2">
          <div className="flex items-center justify-center gap-9">
            <p className="font-bold">{userPosts.length}</p>
            <div>|</div>
            <p className="font-bold">{user.followers.length}</p>
            <div>|</div>
            <p className="font-bold">{user.following.length}</p>
          </div>
          <div className="w-full flex items-center justify-center gap-10 mt-1">
            <p className="">Posts</p>
            <p className="">Followers</p>
            <p className="">Following</p>
          </div>
        </div>
        <div className="ml-1 mt-5">
          <p className="font-semibold">{user.name}</p>
          <p>
            {user.bio ? (
              user.bio
            ) : (
              <span className="opacity-50">Pas de bio</span>
            )}
          </p>
        </div>
      </div>
      <div className="ml-1 mt-6">
        <ul className="flex flex-col gap-5">
          <li className="flex gap-3">
            <Home />
            <Link to="/home/feed"> Feed</Link>
          </li>
          <li className="flex gap-3">
            <Video />
            <Link to="/home/reel"> Reels</Link>
          </li>
          <li className="flex gap-3">
            <Podcast />
            <Link to="/home/my-post"> My Posts</Link>
          </li>
          <li className="flex gap-3">
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
