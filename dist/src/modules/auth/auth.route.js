import { Router } from "express";
import { authController } from "./auth.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
const router = Router();
router.post("/login", authController.loginUser);
router.get("/me", auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN), authController.getMyProfile);
router.post("/refresh-token", authController.refreshToken);
export const authRoutes = router;
//# sourceMappingURL=auth.route.js.map