import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      jobType,
      category,
      salary,
      description,
      requirements,
    } = req.body;

    if (
      !title ||
      !companyName ||
      !location ||
      !category ||
      !salary ||
      !description
    ) {
      return res.status(400).json({
        message: "Please fill all required job fields",
      });
    }

    const job = await Job.create({
      title,
      companyName,
      location,
      jobType,
      category,
      salary,
      description,
      requirements,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error.message);
    res.status(500).json({
      message: "Server error while creating job",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      category,
      location,
      jobType,
      sortBy = "latest",
      page = 1,
      limit = 6,
    } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    let sortOption = { createdAt: -1 };

    if (sortBy === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sortBy === "title-asc") {
      sortOption = { title: 1 };
    } else if (sortBy === "title-desc") {
      sortOption = { title: -1 };
    } else if (sortBy === "location-asc") {
      sortOption = { location: 1 };
    } else if (sortBy === "location-desc") {
      sortOption = { location: -1 };
    }

    const currentPage = Number(page) || 1;
    const perPage = Number(limit) || 6;
    const skip = (currentPage - 1) * perPage;

    const totalJobs = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .populate("postedBy", "fullName email role")
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(totalJobs / perPage);

    res.status(200).json({
      jobs,
      pagination: {
        totalJobs,
        totalPages,
        currentPage,
        perPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("Get all jobs error:", error.message);
    res.status(500).json({
      message: "Server error while fetching jobs",
    });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "fullName email role"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });
  } catch (error) {
    console.error("Get single job error:", error.message);
    res.status(500).json({
      message: "Server error while fetching job details",
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Get my jobs error:", error.message);
    res.status(500).json({
      message: "Server error while fetching your jobs",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied. You cannot edit this job",
      });
    }

    const {
      title,
      companyName,
      location,
      jobType,
      category,
      salary,
      description,
      requirements,
    } = req.body;

    job.title = title ?? job.title;
    job.companyName = companyName ?? job.companyName;
    job.location = location ?? job.location;
    job.jobType = jobType ?? job.jobType;
    job.category = category ?? job.category;
    job.salary = salary ?? job.salary;
    job.description = description ?? job.description;
    job.requirements = requirements ?? job.requirements;

    const updatedJob = await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error.message);
    res.status(500).json({
      message: "Server error while updating job",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied. You cannot delete this job",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error.message);
    res.status(500).json({
      message: "Server error while deleting job",
    });
  }
};