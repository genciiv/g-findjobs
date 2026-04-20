import express from "express";
import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllJobsAdmin,
  deleteJobAdmin,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(allowRoles("admin"));

router.get("/stats", getAdminStats);

router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

router.get("/jobs", getAllJobsAdmin);
router.delete("/jobs/:id", deleteJobAdmin);

export default router;