import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../socket";
import { ReseauContext } from "../Context/ReseauContext";

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const { getUnreadMessageCount, getUnreadPerChat } = useContext(ReseauContext);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chatId || !token) return;
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.messages || []);
        
        // Marquer les messages non-lus comme lus
        const unreadMessages = res.data.messages?.filter(m => 
          String(m.sender) !== String(user._id || user?.id) && !m.isRead
        ) || [];
        
        for (const msg of unreadMessages) {
          try {
            await axios.patch(
              `http://localhost:5000/api/messages/read/${msg._id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } },
            );
          } catch (err) {
            console.error("Erreur marquage message comme lu:", err);
          }
        }
        
        // Rafraîchir les compteurs
        getUnreadMessageCount();
        getUnreadPerChat();
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, [chatId, token]);

  useEffect(() => {
    const handler = (message) => {
      if (message.chatId === chatId) {
        setMessages((prev) => [...prev, message]);
        // Mettre à jour les compteurs de messages non lus
        getUnreadMessageCount();
        getUnreadPerChat();
      }
    };
    socket.on("receiveMessage", handler);
    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        { chatId, text },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // append local message
      const created = res.data.message;
      setMessages((prev) => [...prev, created]);

      // server handles socket emit via messageController, no need to emit here
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="bg-white rounded-lg p-4 max-w-2xl mx-auto">
        <div className="max-h-[60vh] overflow-y-auto mb-4">
          {messages.map((m, idx) => (
            <div
              key={m._id ? String(m._id) : `msg-${idx}`}
              className={`mb-2 flex ${String(m.sender) === String(user._id || user?.id) ? "justify-end" : "justify-start"}`}
            >
              <div className={`p-2 rounded-lg ${String(m.sender) === String(user._id || user?.id) ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                <div>{m.text}</div>
                <div className="text-[10px] opacity-60 text-right">{new Date(m.createdAt).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={send} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-2 rounded-full border"
            placeholder="Ecrire un message..."
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
