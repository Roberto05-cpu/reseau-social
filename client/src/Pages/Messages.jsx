import React from "react";
import watch from "../assets/watch.jpg";
import { Search } from "lucide-react";
import { useContext } from "react";
import { ReseauContext } from "../Context/ReseauContext";
import { useEffect } from "react";
import defautuser from "../assets/defautuser.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";

const Messages = () => {
  const { friends, getFriends, onlineUsers, token, unreadPerChat, getUnreadPerChat } = useContext(ReseauContext);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const getUserChats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data)
      setChats(res.data.chats);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFriends();
    getUserChats();
    getUnreadPerChat();
  }, [token]);

  const openChat = (chat) => {
    navigate(`/home/chat/${chat._id}`);
  };

  const startChatWith = async (friendId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chats",
        { receiverId: friendId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const chat = res.data.chat;
      navigate(`/home/chat/${chat._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la création du chat");
    }
  };

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />
          <input
            type="text"
            className="w-[300px] h-[30px] rounded-full bg-white pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px]"
            placeholder="Rechercher"
          />
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto max-w-full mt-3 pb-3">
        {friends.length === 0 ? (
          <p className="text-gray-500">Aucun ami à afficher.</p>
        ) : (
          friends.map((friend, i) => (
            <div key={i} className="flex-shrink-0 relative cursor-pointer" onClick={() => startChatWith(friend._id)}>
              <img
                src={
                  friend.avatar
                    ? `http://localhost:5000${friend.avatar}`
                    : defautuser
                }
                className="w-20 h-20 rounded-[100%] flex-shrink-0 object-cover"
                alt=""
              />
              {onlineUsers.has(friend._id) && (
                <span className="absolute bottom-6 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
              )}
              <p className="text-center font-bold">{friend.name}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {chats.length === 0 ? (
          <p className="text-gray-500">Aucune conversation</p>
        ) : (
          chats.map((chat, i) => {
            // déterminer le membre correspondant (other)
            const currentUserId = JSON.parse(sessionStorage.getItem("user"))?._id;
            const otherId = chat.members.find((m) => String(m) !== String(currentUserId));
            const friend = friends.find((f) => String(f._id) === String(otherId)) || {};
            const unreadCount = unreadPerChat[chat._id] || 0;
            
            return (
              <div key={i} onClick={() => openChat(chat)} className={`flex justify-between p-2 rounded-xl cursor-pointer transition ${
                unreadCount > 0 
                  ? 'bg-blue-50 border-2 border-blue-300' 
                  : 'bg-white'
              }`}>
                <div className="flex gap-2 flex-1">
                  <img
                    src={friend.avatar ? `http://localhost:5000${friend.avatar}` : watch}
                    className="w-16 h-16 rounded-[100%] flex-shrink-0 object-cover"
                    alt=""
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <p className={`font-bold ${unreadCount > 0 ? 'text-blue-600' : ''}`}>{friend.name}</p>
                    <p className={`text-sm ${unreadCount > 0 ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>
                      {chat.lastMessage || 'Aucun message'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-between">
                  <span className="text-xs opacity-60">{chat.updatedAt ? new Date(chat.updatedAt).toLocaleString() : ''}</span>
                  {unreadCount > 0 && (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Messages;
