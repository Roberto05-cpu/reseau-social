import React from "react";
import { Bell, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ReseauContext } from "../Context/ReseauContext";

const HeadComp = ({ setOpenModal }) => {
  const { unreadNotifCount } = useContext(ReseauContext);

  return (
    <div className="flex items-center justify-between">
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
      <div className="flex gap-4 items-center">
        <div className="relative">
          <Link to="/home/notifications">
            <Bell size={18} />
          </Link>
          {unreadNotifCount > 0 && (
            <span
              className="
          absolute -top-3 -right-1
          bg-red-500 text-white text-xs
          w-5 h-5 flex items-center justify-center
          rounded-[50%]
        "
            >
              {unreadNotifCount}
            </span>
          )}
        </div>
        <Link to="/home/messages">
          <MessageCircle size={18} />
        </Link>
        <button
          onClick={() => setOpenModal(true)}
          className="py-2 px-5 bg-red-400 text-white font-bold rounded-full"
        >
          + Creer un nouveau post
        </button>
      </div>
    </div>
  );
};

export default HeadComp;
