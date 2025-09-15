import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

const app = express();

const server = http.createServer(app);

app.use(express.json({ limit: "4mb" }));

app.use(cors());

app.use("/api/status", (req, res) => res.send("hello from server"));

const PORT = process.env.PORT || 4344;

await connectDB();

server.listen(PORT, (error) => {
  console.log("Server is running on " + PORT);
});
