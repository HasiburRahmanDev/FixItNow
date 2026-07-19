import { Router } from "express";
import { userController } from "./users.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/register", userController.userRegister);
router.put("/my-profile", auth(Role.TECHNICIAN, Role.ADMIN, Role.CUSTOMER), userController.updateProfile);
export const userRoutes = router;
//# sourceMappingURL=users.route.js.map