import React from "react";
import { MoreHorizontal, BadgeCheck } from "lucide-react";
import { useContext } from "react";
import { ReseauContext } from "../Context/ReseauContext";
import { useEffect } from "react";
import { useState } from "react";

const Notifications = () => {
  const { notifs, getMyNotifs , markAllNotifAsRead, allNotifAsRead} = useContext(ReseauContext);
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifs = notifs.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  useEffect(() => {
    getMyNotifs();
  }, []);

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vos notifications</h1>
        <div className="flex items-center gap-1">
          <div className="flex">
            <BadgeCheck onClick={() => markAllNotifAsRead()} className={`${allNotifAsRead ? "text-blue-500" : ""}`} />
          </div>
          <p>Marqer tout comme lu</p>
        </div>
      </div>
      <ul className="mt-5 flex items-center gap-4">
        {[
          { label: "Tous", value: "all" },
          { label: "Abonnements", value: "follow" },
          { label: "Likes", value: "like" },
          { label: "Commentaires", value: "comment" },
        ].map((tab) => (
          <li
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-8 py-3 rounded-xl cursor-pointer transition
        ${
          activeTab === tab.value
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-2">
        {filteredNotifs.length === 0 ? (
          <p className="text-gray-500">Aucune notification</p>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif._id}
              className={`flex items-center justify-between p-2 rounded-xl
          ${notif.isRead ? "bg-white" : "bg-blue-50"}
        `}
            >
              <div className="flex items-center gap-2">
                <img
                  src={`http://localhost:5000${notif.senderId.avatar}`}
                  className="w-10 h-10 rounded-[50%] object-cover"
                  alt=""
                />
                <div>
                  <p className="font-bold">
                    {notif.senderId.name}{" "}
                    {notif.type === "follow" && "s’est abonné à vous"}
                    {notif.type === "like" && `a aimé votre publication : ${notif.postId.message}`}
                    {notif.type === "comment" && `a commenté votre publication : ${notif.postId.message}`}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <MoreHorizontal />
                {!notif.isRead && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
