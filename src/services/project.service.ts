import Project from '../models/Project';
import { IProject } from '../types';

export class ProjectService {
  async createProject(
    title: string,
    description: string,
    ownerId: string,
    status?: 'active' | 'on-hold' | 'completed' | 'archived',
    members?: string[]
  ): Promise<IProject> {
    const project = await Project.create({
      title,
      description,
      status: status || 'active',
      owner: ownerId,
      members: members || [],
    });

    return project;
  }

  async getAllProjects(userId: string, userRole: string): Promise<IProject[]> {
    let query = {};

    // Admin can see all projects, members see only their projects
    if (userRole !== 'admin') {
      query = {
        $or: [{ owner: userId }, { members: userId }],
      };
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    return projects;
  }

  async getProjectById(projectId: string, userId: string, userRole: string): Promise<IProject> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Check if user has access to this project
    if (
      userRole !== 'admin' &&
      project.owner !== userId &&
      !project.members.includes(userId)
    ) {
      throw new Error('Access denied');
    }

    return project;
  }

  async updateProject(
    projectId: string,
    userId: string,
    userRole: string,
    updates: Partial<IProject>
  ): Promise<IProject> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Only owner or admin can update project
    if (userRole !== 'admin' && project.owner !== userId) {
      throw new Error('Only project owner or admin can update this project');
    }

    Object.assign(project, updates);
    await project.save();

    return project;
  }

  async deleteProject(projectId: string, userId: string, userRole: string): Promise<void> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Only owner or admin can delete project
    if (userRole !== 'admin' && project.owner !== userId) {
      throw new Error('Only project owner or admin can delete this project');
    }

    await project.deleteOne();
  }
}

export default new ProjectService();
