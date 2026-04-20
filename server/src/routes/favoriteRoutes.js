import express from "express";
import {
  toggleFavoriteJob,
  getMyFavoriteJobs,
  checkIfJobIsFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/my-favorites", protect, allowRoles("candidate"), getMyFavoriteJobs);
router.get("/check/:jobId", protect, allowRoles("candidate"), checkIfJobIsFavorite);
router.post("/toggle/:jobId", protect, allowRoles("candidate"), toggleFavoriteJob);

export default router;