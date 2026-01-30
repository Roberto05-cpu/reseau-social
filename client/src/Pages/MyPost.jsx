import React from "react";
import HeadComp from "../Components/HeadComp";
import watch from "../assets/watch.jpg";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react";

const MyPost = () => {
  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto">
      <HeadComp />
      <h1 className="mt-5 font-bold text-2xl">Mes Posts</h1>
      <div className="mt-5 flex gap-3">
        <div className="bg-white w-[400px] rounded-[10px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={watch} className="w-16 h-16 rounded-[100%]" alt="" />
              <div>
                <p className="font-bold">Sonya Louena</p>
                <span>Dubai</span>
              </div>
            </div>
            <MoreHorizontal />
          </div>
          <img src={watch} alt="" />
          <div className="mt-1 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Heart />
              <MessageCircle />
              <Send />
            </div>
            <Bookmark className="mr-5" />
          </div>
          <div>
            <p>
              Liked by <strong>Abhinav_khare</strong> and{" "}
              <strong>124k others</strong>
            </p>
            <p>Comment du user</p>
          </div>
        </div>
        <div className="bg-white w-[400px] rounded-[10px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={watch} className="w-16 h-16 rounded-[100%]" alt="" />
              <div>
                <p className="font-bold">Sonya Louena</p>
                <span>Dubai</span>
              </div>
            </div>
            <MoreHorizontal />
          </div>
          <img src={watch} alt="" />
          <div className="mt-1 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Heart />
              <MessageCircle />
              <Send />
            </div>
            <Bookmark className="mr-5" />
          </div>
          <div>
            <p>
              Liked by <strong>Abhinav_khare</strong> and{" "}
              <strong>124k others</strong>
            </p>
            <p>Comment du user</p>
          </div>
        </div>
        <div className="bg-white w-[400px] rounded-[10px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={watch} className="w-16 h-16 rounded-[100%]" alt="" />
              <div>
                <p className="font-bold">Sonya Louena</p>
                <span>Dubai</span>
              </div>
            </div>
            <MoreHorizontal />
          </div>
          <img src={watch} alt="" />
          <div className="mt-1 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Heart />
              <MessageCircle />
              <Send />
            </div>
            <Bookmark className="mr-5" />
          </div>
          <div>
            <p>
              Liked by <strong>Abhinav_khare</strong> and{" "}
              <strong>124k others</strong>
            </p>
            <p>Comment du user</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
