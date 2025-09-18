import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import { userRouter } from "./routes/user.routes.js";
import { messageRouter } from "./routes/message.routes.js";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

// middleware setup
app.use(express.json({ limit: "4mb" }));

app.use(cors());

export const io = new Server(server, {
  cors: { origin: "*" },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected"), userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", userId);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/api/status", (req, res) => res.send("hello from server"));

// user routes
app.use("/api/auth", userRouter);

// message routes
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 4344;

await connectDB();

server.listen(PORT, (error) => {
  console.log("Server is running on " + PORT);
});
