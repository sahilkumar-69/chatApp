import React, { useEffect, useRef } from "react";
import { CgInfo } from "react-icons/cg";
import { RxAvatar } from "react-icons/rx";
import { messageData } from "../Assets/DomiData";
import formateMessageTime from "../lib/utils";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return selectedUser ? (
    <div className=" h-full overflow-scroll relative backdrop-blur-lg">
      {/* -- profile-- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        {selectedUser.image ? (
          <img
            src={selectedUser.image}
            className="w-[35px] bg-cover bg-center  aspect-[1/1] rounded-full"
            alt="user image"
          />
        ) : (
          <RxAvatar size={30} className=" w-[35px] aspect-[1/1] rounded-full" />
        )}
        <p className="flex-1 flex text-lg text-white items-center gap-2">
          {selectedUser.name}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>

        <CgInfo size={30} color="white" className="max-md:hidden " />
      </div>
      {/* --chat area-- */}
      <div className="flex flex-col   h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 ">
        {messageData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== "f9dsaf9ds" && "flex-row-reverse"
            } `}
          >
            {msg.image ? (
              <img
                src={msg.image}
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                alt=""
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId === "f9dsaf9ds"
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "f9dsaf9ds"
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7rzJ2Lh5jncdSe8H7qQ4YJlKhmRbXeTY_tQ&s"
                    : "https://i.pinimg.com/736x/93/ac/57/93ac5791deeb4cd4ae8a857348569ce5.jpg"
                }
                className="w-7 rounded-full"
                alt=""
              />
              <p className="text-gray-500">
                {msg.createdAt}
                {/* {formateMessageTime(msg.createdAt)} */}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      <div className="absolute   bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full ">
          <input
            type="text"
            name=""
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
            id=""
          />
          <input
            type="file"
            name=""
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <FaImage
              size={20}
              alt="input label"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <div className="bg-gradient-to-br  p-3 rounded-full" >
          <IoSend size={20} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4144/4144845.png"
        alt=""
        className="max-w-16"
      />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
