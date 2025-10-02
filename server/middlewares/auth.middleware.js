import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "token not provided",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decoded", decodedData);

    const user = await User.findById(decodedData.userId).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    // console.log("user", user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
      error,
    });
  }
};
