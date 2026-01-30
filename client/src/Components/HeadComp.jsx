import React from "react";
import { Bell, MessageCircle, Search } from "lucide-react";

const HeadComp = () => {
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
        <Bell size={18} />
        <MessageCircle size={18} />
        <button className="py-2 px-5 bg-red-400 text-white font-bold rounded-full">
          + Creer un nouveau post
        </button>
      </div>
    </div>
  );
};

export default HeadComp;
