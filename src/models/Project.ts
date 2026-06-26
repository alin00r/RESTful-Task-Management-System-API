import mongoose, { Schema, Model } from "mongoose";
import { IProject } from "../types";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["active", "on-hold", "completed", "archived"],
      default: "active",
    },
    owner: {
      type: String,
      ref: "User",
      required: [true, "Project owner is required"],
    },
    members: {
      type: [String],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
  },
);

// Indexes for faster queries
projectSchema.index({ owner: 1 });
projectSchema.index({ members: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

// Cascade delete tasks when project is deleted
projectSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await mongoose.model("Task").deleteMany({ project: this._id });
  },
);

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  projectSchema,
);

export default Project;
