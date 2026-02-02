import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ReseauContext = createContext();

const ReseauContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const s = sessionStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllPosts(response.data.posts || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des posts", error);
    }
  };

  const updatePostInState = (updatedPost) => {
    setAllPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  const removePostFromState = (postId) => {
    setAllPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const getFriends = async () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")) || user;
    if (!sessionUser) return;

    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = res.data.selectUsers || [];

      const following = sessionUser.following || [];
      const followers = sessionUser.followers || [];
      const mutualIds = following.filter((id) => followers.includes(id));

      const mutualUsers = users.filter((u) => mutualIds.includes(u._id));
      setFriends(mutualUsers);
    } catch (error) {
      console.error("Erreur lors de la récupération des amis", error);
    }
  };

  const refreshUserFromSession = () => {
    try {
      const s = sessionStorage.getItem("user");
      setUser(s ? JSON.parse(s) : null);
    } catch (e) {
      setUser(null);
    }
  };

  const value = {
    openModal,
    setOpenModal,
    allPosts,
    setAllPosts,
    friends,
    setFriends,
    token,
    user,
    refreshUserFromSession,
    getAllPosts,
    getFriends,
    updatePostInState,
    removePostFromState,
  };

  return <ReseauContext.Provider value={value}>{children}</ReseauContext.Provider>;
};

export default ReseauContextProvider;
