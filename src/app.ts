import cookieParser from "cookie-parser";
import express, {
  application,
  Application,
  NextFunction,
  Request,
  response,
  Response,
} from "express";
import cors from "cors";
import config from "../config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/users/users.route";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/services/services.route";
import { bookingRoutes } from "./modules/bookings/booking.route";
import { paymentRoutes } from "./modules/payments/payment.route";
import { stripe } from "./lib/stripe";
import { paymentController } from "./modules/payments/payment.controller";
import path from "node:path";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalError";

const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook,
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
app.use("/api/payment/", paymentRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
