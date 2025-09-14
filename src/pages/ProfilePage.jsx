import React, { useState } from "react";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg ">
        <form className="flex flex-col gap-5 p-10 flex-1">
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
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
