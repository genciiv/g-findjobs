import express from "express";
import {
  createJob,
  getAllJobs,
  getSingleJob,
  getMyJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/my-jobs", protect, allowRoles("company", "admin"), getMyJobs);
router.get("/:id", getSingleJob);

router.post("/", protect, allowRoles("company", "admin"), createJob);

router.put("/:id", protect, allowRoles("company", "admin"), updateJob);
router.delete("/:id", protect, allowRoles("company", "admin"), deleteJob);

export default router;