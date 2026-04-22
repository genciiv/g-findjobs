import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Remote", "Internship", "Contract"],
      default: "Full Time",
    },
    category: {
      type: String,
      enum: [
        "IT & Software",
        "Marketing & Media",
        "Graphic Design",
        "Sales & Business",
        "Finance",
        "Administration",
        "Education",
        "Remote Jobs",
      ],
      required: [true, "Category is required"],
      trim: true,
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    requirements: {
      type: String,
      default: "",
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;