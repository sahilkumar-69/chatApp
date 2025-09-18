import React, { useContext, useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [FormData, setFormData] = useState({
    name: authUser.fullName,
    bio: authUser.bio,
  });

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      await updateProfile({ fullName: FormData.name, bio: FormData.bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        fullName: FormData.name,
        bio: FormData.bio,
      });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg ">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
              type="file"
              name="avatar"
              hidden
              id="avatar"
              accept=".png, .jpeg, .jpg"
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="profile image"
              className="w-12 h-12  rounded-full"
            />
            Upload profile image
          </label>
          <input
            type="text"
            value={FormData.name}
            onChange={handleOnChange}
            name="name"
            placeholder="Your name"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            id=""
          />
          <textarea
            name="bio"
            required
            value={FormData.bio}
            onChange={handleOnChange}
            placeholder="Write profile bio"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            id=""
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>
        {authUser.profilePic ? (
          <img
            src={authUser.profilePic}
            alt="profile picture"
            className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10`}
          />
        ) : (
          <HiOutlineChatBubbleLeftRight
            className="max-w-44 aspect-square rounded-full max-sm:mt-10 mx-10"
            color="white"
            size={400}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
