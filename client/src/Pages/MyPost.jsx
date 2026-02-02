import React, { useContext, useEffect, useState } from "react";
import HeadComp from "../Components/HeadComp";
import watch from "../assets/watch.jpg";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import axios from "axios";
import PostModel from "../Components/PostModel";
import CreatePost from "../Components/CreatePost";
import { ReseauContext } from "../Context/ReseauContext";

const MyPost = () => {

  const [userPosts, setUserPosts] = useState([]);

  const { token, openModal, setOpenModal, updatePostInState, removePostFromState} = useContext(ReseauContext)

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
  }, []);

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <HeadComp setOpenModal={setOpenModal} />
      <h1 className="mt-5 font-bold text-2xl">Mes Posts</h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-center">
        {userPosts.map((post, i) => (
          <PostModel key={i} post={post} onUpdate={updatePostInState} onDelete={removePostFromState} />
        ))}
      </div>
      <CreatePost isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default MyPost;
