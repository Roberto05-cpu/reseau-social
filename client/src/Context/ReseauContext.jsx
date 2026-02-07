import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../socket";

export const ReseauContext = createContext();

const ReseauContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [notifs, setNotifs] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [allNotifAsRead, setAllNotifAsRead] = useState(false)

  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadPerChat, setUnreadPerChat] = useState({});

  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  // useEffect(() => {
  //   const s = sessionStorage.getItem("user");
  //   if (s) setUser(JSON.parse(s));
  // }, []);

  // écouter les users online via socket
  useEffect(() => {
    if (!token) return;

    socket.on("onlineUsers", (users) => {
      // users = array des userIds en ligne
      setOnlineUsers(new Set(users));
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [token]);

  // informer le serveur que cet utilisateur est en ligne
  useEffect(() => {
    if (!token || !user) return;
    socket.emit("join", user._id);
  }, [token, user]);

  const getMyNotifs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifs(res.data.notifs || []);
      console.log(notifs);
    } catch (e) {
      console.error("Erreur notifs", e);
    }
  };

  const getUnreadNotifCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifs/unread-count",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUnreadNotifCount(res.data.count || 0);
    } catch (error) {
      console.error("Erreur unread notif count", error);
    }
  };

  const markAllNotifAsRead = async () => {
    try {
      await axios.patch(
        "http://localhost:5000/api/notifs/read-all",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setAllNotifAsRead(true)
      alert("Toutes vos notifs ont ete marques comme lues")
    } catch (e) {
      console.error(e);
    }
  };

  const getUnreadMessageCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/messages/unread-count",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUnreadMessageCount(res.data.unreadCount || 0);
    } catch (error) {
      console.error("Erreur unread message count", error);
    }
  };

  const getUnreadPerChat = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/messages/unread-per-chat",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUnreadPerChat(res.data.unreadPerChat || {});
    } catch (error) {
      console.error("Erreur unread per chat", error);
    }
  };

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
    setAllPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
    );
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

  useEffect(() => {
    if (token) {
      getUnreadNotifCount();
      getUnreadMessageCount();
      getUnreadPerChat();
    }
  }, [token]);

  const value = {
    openModal,
    setOpenModal,
    allPosts,
    setAllPosts,
    friends,
    setFriends,
    token,
    user,
    setUser,
    refreshUserFromSession,
    getAllPosts,
    getFriends,
    updatePostInState,
    removePostFromState,
    unreadNotifCount,
    setUnreadNotifCount,
    getUnreadNotifCount,
    notifs,
    getMyNotifs,
    markAllNotifAsRead,
    onlineUsers,
    allNotifAsRead,
    unreadMessageCount,
    setUnreadMessageCount,
    getUnreadMessageCount,
    unreadPerChat,
    setUnreadPerChat,
    getUnreadPerChat,
  };

  return (
    <ReseauContext.Provider value={value}>{children}</ReseauContext.Provider>
  );
};

export default ReseauContextProvider;
