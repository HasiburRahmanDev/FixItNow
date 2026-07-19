import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/bookings", auth(Role.CUSTOMER), bookingController.createBooking);
router.get("/bookings", bookingController.getMyBookings);
router.get(
  "/bookings/:id",
  auth(Role.CUSTOMER),
  bookingController.getBookingById,
);
export const bookingRoutes = router;
