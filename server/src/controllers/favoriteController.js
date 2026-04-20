import Favorite from "../models/Favorite.js";
import Job from "../models/Job.js";

export const toggleFavoriteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingFavorite) {
      await existingFavorite.deleteOne();

      return res.status(200).json({
        message: "Job removed from favorites",
        isFavorite: false,
      });
    }

    await Favorite.create({
      user: req.user._id,
      job: jobId,
    });

    res.status(201).json({
      message: "Job added to favorites",
      isFavorite: true,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error.message);
    res.status(500).json({
      message: "Server error while updating favorites",
    });
  }
};

export const getMyFavoriteJobs = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate({
        path: "job",
        populate: {
          path: "postedBy",
          select: "fullName email role",
        },
      })
      .sort({ createdAt: -1 });

    const favoriteJobs = favorites
      .filter((item) => item.job)
      .map((item) => ({
        _id: item._id,
        savedAt: item.createdAt,
        job: item.job,
      }));

    res.status(200).json({
      favorites: favoriteJobs,
    });
  } catch (error) {
    console.error("Get favorite jobs error:", error.message);
    res.status(500).json({
      message: "Server error while fetching favorite jobs",
    });
  }
};

export const checkIfJobIsFavorite = async (req, res) => {
  try {
    const { jobId } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user._id,
      job: jobId,
    });

    res.status(200).json({
      isFavorite: !!favorite,
    });
  } catch (error) {
    console.error("Check favorite error:", error.message);
    res.status(500).json({
      message: "Server error while checking favorite job",
    });
  }
};