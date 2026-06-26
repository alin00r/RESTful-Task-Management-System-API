import mongoose, { Schema, Model } from "mongoose";
import { ITask } from "../types";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return !value || value > new Date();
        },
        message: "Due date must be in the future",
      },
    },
    project: {
      type: String,
      ref: "Project",
      required: [true, "Project is required"],
    },
    assignedTo: {
      type: String,
      ref: "User",
    },
    createdBy: {
      type: String,
      ref: "User",
      required: [true, "Creator is required"],
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
taskSchema.index({ project: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ createdAt: -1 });

// Compound index for common queries
taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ project: 1, priority: 1 });

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
