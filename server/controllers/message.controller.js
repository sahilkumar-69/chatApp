import mongoose from "mongoose";
import { io, userSocketMap } from "../index.js";
import { cloudinary } from "../lib/cloudinary.js";
import { message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const filteredUser = await User.find({
      _id: { $ne: userId },
    }).select("-password");

    // console.log(filteredUser);

    const unseenMessages = {};

    const promises = filteredUser.map(async (user) => {
      const messages = await message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);

    res.json({
      success: true,
      users: filteredUser,
      unseenMessages,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;

    const myId = req.user._id;

    const messages = await message.find({
      $or: [
        {
          senderId: myId,
          receiverId: selectedUserId, 
        },
        {
          senderId: selectedUserId,
          receiverId: myId,
        },
      ],
    });

    await message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      {
        seen: true,
      }
    );

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;

    await message.findByIdAndUpdate(id, {
      seen: true,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// send message to selected user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    const { _id: senderId } = req.user;

    let imageUrl;

    if (image) {
      const uploadResp = await cloudinary.uploader.upload(image, {
        folder: "ChatApp",
      });

      imageUrl = uploadResp.secure_url;
    }

    const newMessage = await message.create({
      senderId,
      receiverId,
      image: imageUrl,
      text,
    });

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId)
      io.to(receiverSocketId).emit("newMessage", newMessage);

    res.json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
