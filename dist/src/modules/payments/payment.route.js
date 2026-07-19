import express, { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/createPayment", auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN), paymentController.payment);
router.post("/webhook", express.raw({ type: "application/json" }), paymentController.handleWebhook);
export const paymentRoutes = router;
//# sourceMappingURL=payment.route.js.map