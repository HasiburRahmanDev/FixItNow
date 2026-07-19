import { Router } from "express";
import { serviceController } from "./services.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/services",
  auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER),
  serviceController.createServices,
);

router.get("/all-services", serviceController.getAllServices);
router.get("/technicians", serviceController.getAllTechnicians);

export const serviceRoutes = router;
