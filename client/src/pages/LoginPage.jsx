import React, { useContext, useRef, useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  // const [term, setterm] = useState("checked");

  const termBox = useRef(null);

  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [isSubmtted, setisSubmtted] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (currentState == "Sign up" && !isSubmtted) {
      setisSubmtted(true);
      // console.log(formData);
      return;
    }

    login(currentState === "Sign up" ? "signup" : "login", formData);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* -----------left---------- */}
      <HiOutlineChatBubbleLeftRight color="white" size={150} />
      {/* <img src="" alt="login page left image" /> */}
      {/* -----------right---------- */}

      <form
        onSubmit={handleOnSubmit}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isSubmtted && (
            <IoIosArrowBack
              onClick={() => {
                setisSubmtted(false);
              }}
              className="cursor-pointer"
            />
          )}
        </h2>
        {currentState == "Sign up" && !isSubmtted && (
          <input
            type="text"
            name="fullName"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleOnChange}
          />
        )}

        {!isSubmtted && (
          <>
            <input
              type="email"
              name="email"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleOnChange}
            />
            <input
              type="password"
              name="password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleOnChange}
            />
          </>
        )}

        {currentState == "Sign up" && isSubmtted && (
          <textarea
            name="bio"
            className="p-2 border border-gray-500 rounded-md resize-none focus:outline-none"
            placeholder="Your Bio..."
            required
            rows={4}
            value={formData.bio}
            onChange={handleOnChange}
          />
        )}

        <button
          type="submit"
          // disabled={termBox.current !== "checked"}
          className={` py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer ${
            termBox.current !== "checked"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } `}
        >
          {currentState == "Sign up" ? "Create Account" : "Login Now"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            // value={term}
            ref={termBox}
            onChange={(e) => {
              // console.log(termBox.current.value);
              // console.log(e);
            }}
            name="terms"
            id=""
          />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col text-gray-300 gap-2">
          {currentState == "Sign up" ? (
            <p className="text-sm ">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setisSubmtted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm  ">
              Create an account.{" "}
              <span
                onClick={() => {
                  setCurrentState("Sign up");
                  setisSubmtted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
