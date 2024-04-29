import express, { Request, Response } from "express";

import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import path from "path";
import { v2 as cloudinary } from "cloudinary";

//routers
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelsRoutes);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server running on localhost:7000");
});
