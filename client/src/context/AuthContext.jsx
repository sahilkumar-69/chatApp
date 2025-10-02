import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check", {
        headers: {
          token,
        },
      });

      // console.log("checkauth", data);
      // console.log("token", token);
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // login fun. to handle user authentication and socket connection

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      // console.log("Response",response)

      if (data.success) {
        console.log("data", data);
        setAuthUser(data.user);
        // console.log("authUser", authUser);
        connectSocket(data.user);

        axios.defaults.headers.common["token"] = data.token;

        setToken(data.token);
        // console.log("token", token);
        localStorage.setItem("token", data.token);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    }
  };

  // login fun. to handle user authentication and socket connection

  const logOut = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;

    toast.success("Logged out successfully");
    socket.disconnect();
  };

  // Update profile fun. to handle user profile updates

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update", body);

      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // connect socket function to handle socket connection and online users updates
  const connectSocket = (userData) => {
    if (!userData) return;

    // Disconnect old socket if exists
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      // console.log(" Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      // console.log("userids", userIds);
      setOnlineUsers(userIds);
    });

    newSocket.on("disconnect", () => {
      // console.log(" Socket disconnected");
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
  }, []);

  const value = {
    token,
    authUser,
    onlineUsers,
    socket,
    axios,
    checkAuth,
    login,
    logOut,
    updateProfile,
    connectSocket,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
