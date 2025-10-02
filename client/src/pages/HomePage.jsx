import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSideBar from "../components/RightSideBar";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className='  w-full bg-[url("https://wallpapers.com/images/hd/high-resolution-blue-background-1920-x-1080-9ievy5j853ofx6e1.jpg")] h-screen sm:px-[15%] sm:py-[5%]'>
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr] "
            : "md:grid-cols-2"
        } `}
      >
        <Sidebar />
        <ChatContainer />
        <RightSideBar />
      </div>
    </div>
  );
};

export default HomePage;
