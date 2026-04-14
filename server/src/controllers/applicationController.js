import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { coverLetter, phone, cvLink } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      coverLetter,
      phone,
      cvLink,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply to job error:", error.message);
    res.status(500).json({
      message: "Server error while applying to job",
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({
        path: "job",
        select: "title companyName location jobType category salary",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get my applications error:", error.message);
    res.status(500).json({
      message: "Server error while fetching your applications",
    });
  }
};

export const getApplicationsForCompany = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate({
        path: "job",
        select: "title companyName location jobType category salary",
      })
      .populate({
        path: "applicant",
        select: "fullName email role",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get company applications error:", error.message);
    res.status(500).json({
      message: "Server error while fetching company applications",
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Reviewed", "Accepted", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(id).populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (
      application.job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied. You cannot update this application",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update application status error:", error.message);
    res.status(500).json({
      message: "Server error while updating application status",
    });
  }
};