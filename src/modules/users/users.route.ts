import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../../config";
import httpStatus from "http-status";
import { userController } from "./users.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.userRegister);
router.put(
  "/my-profile",
  auth(Role.TECHNICIAN, Role.ADMIN, Role.CUSTOMER),
  userController.updateProfile,
);

export const userRoutes = router;
