import Task from '../models/Task';
import Project from '../models/Project';
import { ITask, TaskFilterQuery } from '../types';

export class TaskService {
  async createTask(
    projectId: string,
    userId: string,
    userRole: string,
    taskData: {
      title: string;
      description: string;
      status?: string;
      priority?: string;
      dueDate?: Date;
      assignedTo?: string;
    }
  ): Promise<ITask> {
    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    if (
      userRole !== 'admin' &&
      project.owner !== userId &&
      !project.members.includes(userId)
    ) {
      throw new Error('Access denied');
    }

    const task = await Task.create({
      ...taskData,
      project: projectId,
      createdBy: userId,
    });

    return task;
  }

  async getAllTasksForProject(
    projectId: string,
    userId: string,
    userRole: string,
    filters: TaskFilterQuery
  ): Promise<{ tasks: ITask[]; pagination: any }> {
    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    if (
      userRole !== 'admin' &&
      project.owner !== userId &&
      !project.members.includes(userId)
    ) {
      throw new Error('Access denied');
    }

    // Build query
    const query: any = { project: projectId };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    if (filters.assignedTo) {
      query.assignedTo = filters.assignedTo;
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const tasks = await Task.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getTaskById(
    taskId: string,
    userId: string,
    userRole: string
  ): Promise<ITask> {
    const task = await Task.findById(taskId).populate('project');

    if (!task) {
      throw new Error('Task not found');
    }

    // Check if user has access to the project
    const project = await Project.findById(task.project);
    if (!project) {
      throw new Error('Project not found');
    }

    if (
      userRole !== 'admin' &&
      project.owner !== userId &&
      !project.members.includes(userId)
    ) {
      throw new Error('Access denied');
    }

    return task;
  }

  async updateTask(
    taskId: string,
    userId: string,
    userRole: string,
    updates: Partial<ITask>
  ): Promise<ITask> {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    // Check if user has access to the project
    const project = await Project.findById(task.project);
    if (!project) {
      throw new Error('Project not found');
    }

    if (
      userRole !== 'admin' &&
      project.owner !== userId &&
      !project.members.includes(userId)
    ) {
      throw new Error('Access denied');
    }

    Object.assign(task, updates);
    await task.save();

    return task;
  }

  async deleteTask(
    taskId: string,
    userId: string,
    userRole: string
  ): Promise<void> {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    // Check if user has access to the project
    const project = await Project.findById(task.project);
    if (!project) {
      throw new Error('Project not found');
    }

    // Only project owner, task creator, or admin can delete
    if (
      userRole !== 'admin' &&
      project.owner !== userId &&
      task.createdBy !== userId
    ) {
      throw new Error('Only project owner, task creator, or admin can delete this task');
    }

    await task.deleteOne();
  }
}

export default new TaskService();
