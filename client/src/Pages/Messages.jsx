import React from "react";
import watch from "../assets/watch.jpg";
import { Search } from "lucide-react";

const Messages = () => {
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
      <div className="flex gap-5 overflow-x-auto max-w-full mt-5 pb-3">
        <div className="flex-shrink-0">
          <img
            src={watch}
            className="w-20 h-20 rounded-[100%] flex-shrink-0 object-cover"
            alt=""
          />
          <p className="text-center">Alan</p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={watch}
            className="w-20 h-20 rounded-[100%] flex-shrink-0 object-cover"
            alt=""
          />
          <p className="text-center">Alan</p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={watch}
            className="w-20 h-20 rounded-[100%] flex-shrink-0 object-cover"
            alt=""
          />
          <p className="text-center">Alan</p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={watch}
            className="w-20 h-20 rounded-[100%] flex-shrink-0 object-cover"
            alt=""
          />
          <p className="text-center">Alan</p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={watch}
            className="w-20 h-20 rounded-[100%] flex-shrink-0 object-cover"
            alt=""
          />
          <p className="text-center">Alan</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex justify-between bg-white p-2 rounded-xl">
          <div className="flex gap-2">
            <img
              src={watch}
              className="w-16 h-16 rounded-[100%] flex-shrink-0 object-cover"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">Alan</p>
              <p>Yo robert xdkw, tu vas bien j'espere</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>4 hours ago</span>
            <div className="w-6 h-6 bg-red-500 text-white rounded-[50%] text-center">1</div>
          </div>
        </div>
        <div className="flex justify-between bg-white p-2 rounded-xl">
          <div className="flex gap-2">
            <img
              src={watch}
              className="w-16 h-16 rounded-[100%] flex-shrink-0 object-cover"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">Alan</p>
              <p>Yo robert xdkw, tu vas bien j'espere</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>4 hours ago</span>
            <div className="w-6 h-6 bg-red-500 text-white rounded-[50%] text-center">1</div>
          </div>
        </div>
        <div className="flex justify-between bg-white p-2 rounded-xl">
          <div className="flex gap-2">
            <img
              src={watch}
              className="w-16 h-16 rounded-[100%] flex-shrink-0 object-cover"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">Alan</p>
              <p>Yo robert xdkw, tu vas bien j'espere</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>4 hours ago</span>
            <div className="w-6 h-6 bg-red-500 text-white rounded-[50%] text-center">1</div>
          </div>
        </div>
        <div className="flex justify-between bg-white p-2 rounded-xl">
          <div className="flex gap-2">
            <img
              src={watch}
              className="w-16 h-16 rounded-[100%] flex-shrink-0 object-cover"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">Alan</p>
              <p>Yo robert xdkw, tu vas bien j'espere</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>4 hours ago</span>
            <div className="w-6 h-6 bg-red-500 text-white rounded-[50%] text-center">1</div>
          </div>
        </div>
        <div className="flex justify-between bg-white p-2 rounded-xl">
          <div className="flex gap-2">
            <img
              src={watch}
              className="w-16 h-16 rounded-[100%] flex-shrink-0 object-cover"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">Alan</p>
              <p>Yo robert xdkw, tu vas bien j'espere</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>4 hours ago</span>
            <div className="w-6 h-6 bg-red-500 text-white rounded-[50%] text-center">1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
