import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create/:bookingId",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.createPayment,
);
router.get(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.getPayments,
);

router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.getPaymentById,
);

export const paymentRoutes = router;
