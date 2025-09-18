import { Schema, model } from "mongoose";

const message_schema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: String,
    image: String,
    seen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const message = model("message", message_schema);
