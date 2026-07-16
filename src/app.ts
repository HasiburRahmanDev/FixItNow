import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "../config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/users/users.route";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/services/services.route";
import { bookingRoutes } from "./bookings/booking.route";

const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/", serviceRoutes);
app.use("/api/", bookingRoutes);

export default app;
