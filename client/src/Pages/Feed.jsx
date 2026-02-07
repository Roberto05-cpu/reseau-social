import { PlusCircle } from "lucide-react";
import React, { useContext, useEffect } from "react";
import HeadComp from "../Components/HeadComp";
import { Link } from "react-router-dom";
import CreatePost from "../Components/CreatePost";
import PostModel from "../Components/PostModel";
import defautuser from "../assets/defautuser.png";
import { ReseauContext } from "../Context/ReseauContext";
import { socket } from "../socket";

const Feed = () => {
  const {
    allPosts,
    getAllPosts,
    friends,
    getFriends,
    setOpenModal,
    openModal,
    updatePostInState,
    removePostFromState,
    onlineUsers,
  } = useContext(ReseauContext);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getAllPosts();
    getFriends();

    if (!user) return;

    // le socket global est initialisé dans `client/src/socket.js`
    // le contexte `ReseauContext` émettra le `join` quand l'utilisateur est disponible
    socket.on("connect", () => {
      console.log(" Connecté au serveur Socket.IO (global), id :", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <HeadComp setOpenModal={setOpenModal} />
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Friends</h2>
          <Link to="/home/friends">
            <PlusCircle className="w-8 h-8 text-blue-500 cursor-pointer" />
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto max-w-full mt-3 pb-3">
          {friends.length === 0 ? (
            <p className="text-gray-500">Aucun ami à afficher.</p>
          ) : (
            friends.map((friend, i) => (
              <div key={i} className="flex-shrink-0 relative">
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
      </div>
      <div>
        <h2 className="font-bold text-2xl">Feed</h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-center">
          {allPosts.map((post, i) => (
            <PostModel
              key={i}
              post={post}
              onUpdate={updatePostInState}
              onDelete={removePostFromState}
            />
          ))}
        </div>
      </div>
      <CreatePost isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Feed;
