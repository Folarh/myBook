import express, { Request, Response } from "express";

import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
// import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//routers

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import path from "path";

mongoose.connect(process.env.MONGO_URl as string);

// JSON MIDDLEWARE: SO AS TO PROCESS CLIENTS REQUEST!
const app = express();

//a middleware package that provides logs about your request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server running on localhost:7000");
});
