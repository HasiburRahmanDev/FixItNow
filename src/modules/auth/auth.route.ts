import { NextFunction, Request, Response, Router } from "express";
import { userController } from "../users/users.controller";
import { authController } from "./auth.controller";
import { catchAsync } from "../../utils/catchAsync";
import { Role } from "../../../generated/prisma/enums";
import { jwtUtils } from "../../utils/jwt";
import config from "../../../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/login", authController.loginUser);
router.get(
  "/me",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  authController.getMyProfile,
);

export const authRoutes = router;
