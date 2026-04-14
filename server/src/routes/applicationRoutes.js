import express from "express";
import {
  applyToJob,
  getMyApplications,
  getApplicationsForCompany,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/apply/:id",
  protect,
  allowRoles("candidate"),
  applyToJob
);

router.get(
  "/my-applications",
  protect,
  allowRoles("candidate"),
  getMyApplications
);

router.get(
  "/company-applications",
  protect,
  allowRoles("company", "admin"),
  getApplicationsForCompany
);

router.put(
  "/:id/status",
  protect,
  allowRoles("company", "admin"),
  updateApplicationStatus
);

export default router;