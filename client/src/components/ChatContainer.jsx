import React, { useContext, useEffect, useRef, useState } from "react";
import { CgInfo } from "react-icons/cg";

import { messageData } from "../Assets/DomiData";
import { formatMessageDate, formatMessageTime } from "../lib/utils";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessages, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [groupedMessages, setgroupedMessages] = useState(null);

  const scrollEnd = useRef();

  const inputRef = useRef();

  const [input, setInput] = useState("");

  // handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      inputRef.current.focus();
      inputRef.current.placeholder = "Write something ";
      return null;
    }

    await sendMessages({ text: input.trim() });
    setInput("");
  };

  // handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessages({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    setgroupedMessages(
      messages.reduce((groups, msg) => {
        const dateKey = new Date(msg.createdAt).toDateString();
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(msg);
        return groups;
      }, {})
    );

    // console.log("message", messages);
  }, [messages]);

  return selectedUser ? (
    <div className=" h-full overflow-scroll relative backdrop-blur-lg">
      {/* -- profile-- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={
            selectedUser?.profilePic ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          className="w-[35px] bg-cover bg-center  aspect-[1/1] rounded-full"
          alt="user image"
        />

        <p className="flex-1 flex text-lg text-white items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>

        <CgInfo
          size={30}
          color="white"
          className="max-md:hidden cursor-pointer"
        />
      </div>
      {/* --chat area-- */}
      <div className="flex flex-col relative h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {Object.entries(groupedMessages).map(([dateKey, msgs]) => (
          <div key={dateKey}>
            {/* Date heading */}
            <div className="text-center my-2  w-30 left-[40%] sticky top-1 rounded-md  text-gray-400 text-sm">
              {formatMessageDate(dateKey)}
            </div>

            {/* Messages */}
            {msgs.map((msg, index) => (
              <div
                key={index}
                className={`flex  items-end my-3 gap-2 justify-end ${
                  msg.senderId !== authUser._id && "flex-row-reverse"
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
                    className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-1 break-all bg-violet-500/30 text-white ${
                      msg.senderId === authUser._id
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <div className="   text-center   text-xs  ">
                  <img
                    src={
                      msg.senderId === selectedUser._id
                        ? selectedUser?.profilePic ||
                          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        : authUser?.profilePic
                    }
                    className="w-7 aspect-[1/1] rounded-full"
                    alt=""
                  />
                  {/* Show only time here */}
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* ---------bottom area --------------- */}

      <div className="absolute   bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center hover:outline-2 hover:outline-cyan-600 bg-gray-100/12 px-3 rounded-full ">
          <input
            type="text"
            name="inputMessage"
            value={input}
            ref={inputRef}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleSendMessage(e) : null;
            }}
            placeholder="Send a message"
            className="flex-1 text-sm  p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 hover:placeholder-white "
            id=""
          />
          <input
            type="file"
            onChange={handleSendImage}
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
        <div className="bg-gradient-to-br  bg-black text-white cursor-pointer p-3 rounded-full">
          <IoSend onClick={handleSendMessage} size={20} />
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
