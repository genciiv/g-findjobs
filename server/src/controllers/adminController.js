import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Favorite from "../models/Favorite.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalFavorites = await Favorite.countDocuments();

    const candidates = await User.countDocuments({ role: "candidate" });
    const companies = await User.countDocuments({ role: "company" });
    const admins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,
      totalFavorites,
      candidates,
      companies,
      admins,
    });
  } catch (error) {
    console.error("Get admin stats error:", error.message);
    res.status(500).json({
      message: "Server error while fetching admin stats",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { search = "", role = "" } = req.query;

    const filter = {};

    if (search.trim()) {
      filter.$or = [
        { fullName: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (role.trim()) {
      filter.role = role.trim();
    }

    const users = await User.find(filter).select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error.message);
    res.status(500).json({
      message: "Server error while fetching users",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["candidate", "company", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role value",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "User role updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update user role error:", error.message);
    res.status(500).json({
      message: "Server error while updating user role",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin user cannot be deleted",
      });
    }

    await Application.deleteMany({ applicant: user._id });
    await Favorite.deleteMany({ user: user._id });

    const jobs = await Job.find({ postedBy: user._id }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    if (jobIds.length > 0) {
      await Application.deleteMany({ job: { $in: jobIds } });
      await Favorite.deleteMany({ job: { $in: jobIds } });
      await Job.deleteMany({ postedBy: user._id });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).json({
      message: "Server error while deleting user",
    });
  }
};

export const getAllJobsAdmin = async (req, res) => {
  try {
    const { search = "", location = "", jobType = "" } = req.query;

    const filter = {};

    if (search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { companyName: { $regex: search.trim(), $options: "i" } },
        { category: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (location.trim()) {
      filter.location = { $regex: location.trim(), $options: "i" };
    }

    if (jobType.trim()) {
      filter.jobType = jobType.trim();
    }

    const jobs = await Job.find(filter)
      .populate("postedBy", "fullName email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Get all admin jobs error:", error.message);
    res.status(500).json({
      message: "Server error while fetching jobs",
    });
  }
};

export const deleteJobAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await Application.deleteMany({ job: job._id });
    await Favorite.deleteMany({ job: job._id });
    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin job error:", error.message);
    res.status(500).json({
      message: "Server error while deleting job",
    });
  }
};