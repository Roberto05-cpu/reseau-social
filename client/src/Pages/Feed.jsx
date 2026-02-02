import {
  Clock,
  MessageCircle,
  Search,
  MoreHorizontal,
  Heart,
  Send,
  Bookmark,
  Bell,
  PlusCircle,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import watch from "../assets/watch.jpg";
import HeadComp from "../Components/HeadComp";
import { Link } from "react-router-dom";
import CreatePost from "../Components/CreatePost";
import axios from "axios";
import PostModel from "../Components/PostModel";
import defautuser from "../assets/defautuser.png";
import { ReseauContext } from "../Context/ReseauContext";

const Feed = () => {

  const {allPosts, getAllPosts, friends, getFriends, setOpenModal, openModal, updatePostInState, removePostFromState} = useContext(ReseauContext);

  useEffect(() => {
    getAllPosts();
    getFriends();
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
              <div key={i} className="flex-shrink-0">
                <img
                  src={
                    friend.avatar
                      ? `http://localhost:5000${friend.avatar}`
                      : defautuser
                  }
                  className="w-26 h-26 rounded-[100%] flex-shrink-0 object-cover"
                  alt=""
                />
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
            <PostModel key={i} post={post} onUpdate={updatePostInState} onDelete={removePostFromState} />
          ))}
        </div>
      </div>
      <CreatePost isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Feed;
