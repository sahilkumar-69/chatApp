import { Schema, model } from "mongoose";

const user_schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: String,
  },
  {
    timestamps: true,
  }
);

export const User = model("user", user_schema);
