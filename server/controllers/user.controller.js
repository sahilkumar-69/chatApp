import { cloudinary } from "../lib/cloudinary.js";
import { generateJwtToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

// sign up function for user
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    if (!fullName || !email || !password || !bio) {
      return res.status(404).json({
        success: false,
        message: "Missing details",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Account already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateJwtToken(newUser._id);

    return res.status(201).json({
      success: true,
      user: newUser,
      token,
      message: "Account created",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message, error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
        success: false,
        message: "Email is not registered",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Password don't match",
      });
    }

    const token = generateJwtToken(existingUser._id);

    return res.json({
      message: "Logged in",
      success: true,
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
      error,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;

    const userId = req.user._id;
    let updatedUser;
    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          bio,
          fullName,
        },
        {
          new: true,
        }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic, {
        folder: "ChatApp",
      });

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullName,
        },
        {
          new: true,
        }
      );
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  const user = req?.user;
  if (user) {
    return res.json({
      success: true,
      user,
    });
  } else {
    return res.json({
      success: false,
      message: "User is not authenticated",
    });
  }
};
