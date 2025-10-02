import { useState, useContext } from "react";
// import { imagesDummyData } from "../Assets/DomiData";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const RightSideBar = () => {
  const { selectedUser, messages } = useContext(ChatContext);

  const { logOut, onlineUsers } = useContext(AuthContext);

  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(messages.filter((msg) => msg.image).map((msg) => msg.image));

    // console.log("images", images);
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={
              selectedUser?.profilePic ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt="profile photo"
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) && (
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>

        <hr className="border-[#ffffff50] my-4" />
        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {images.length > 0 &&
              images.map((url, index) => (
                <div
                  className="cursor-pointer rounded"
                  onClick={() => {
                    window.open(url);
                  }}
                  key={index}
                >
                  <img
                    src={url}
                    alt="media image"
                    className="h-full rounded-md"
                  />
                </div>
              ))}
          </div>
        </div>
        <button
          onClick={logOut}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
        >
          logout
        </button>
      </div>
    )
  );
};

export default RightSideBar;
