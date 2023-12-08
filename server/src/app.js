import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from './routes/user.routes.js'
import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();


// middlewares:  express.json | cors | cookieParser | morgan | 

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);
app.use(cookieParser());
app.use(morgan("dev"));


// default route
app.use("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PONG",
  });
});

// routes of 3 modules

app.use('/api/v1/user', userRoutes)

app.all("*", (req, res) => {
  res.status(404).send("404, Page NOT FOUND");
});

app.use(errorMiddleware)
export default app;
