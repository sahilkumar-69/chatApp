import { AiFillNotification } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import users from "../Assets/DomiData";
import { RxAvatar } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div
      className={` bg-[#8185B2]/10 h-full p-5 rounded-r-xl  overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      } `}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <HiOutlineChatBubbleLeftRight size={25} className="max-w-40   " />
          <div className="relative  group">
            <HiOutlineMenu size={25} className="cursor-pointer  max-h-5" />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border-gray-600 text-gray-100 hidden group-hover:block ">
              <p
                onClick={() => {
                  navigate("/profile");
                }}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={logOut} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>
        <div className=" flex  bg-[#282142] rounded-full items-center gap-2 py-3 px-4 mt-5 ">
          <FiSearch />
          <input
            type="text"
            name=""
            placeholder="Search User..."
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1 "
            id=""
          />
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        {users.map((user, index) => {
          return [
            <div
              onClick={() => {
                setSelectedUser(user);
              }}
              key={index}
              className={` relative flex gap-2 place-items-center p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user._id && "bg-[#282142]/50"
              } `}
            >
              {user?.image ? (
                <img
                  src={user.image}
                  className="w-[35px] aspect-[1/1] rounded-full"
                  alt="user image"
                />
              ) : (
                <RxAvatar
                  size={30}
                  className=" w-[35px] aspect-[1/1] rounded-full"
                />
              )}
              <div className="flex flex-col leading-5">
                <p>{user.name}</p>
                <span
                  className={`text-xs ${
                    user.status == "online"
                      ? "text-green-400"
                      : "text-neutral-400"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              {index > 2 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                  {" "}
                  {index}{" "}
                </p>
              )}
            </div>,
          ];
        })}
      </div>
    </div>
  );
};

export default Sidebar;
