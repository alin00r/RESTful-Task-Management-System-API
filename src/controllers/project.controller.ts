import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import projectService from '../services/project.service';

export class ProjectController {
  async createProject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, status, members } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const project = await projectService.createProject(
        title,
        description,
        userId,
        status,
        members
      );

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const projects = await projectService.getAllProjects(userId, userRole);

      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const project = await projectService.getProjectById(id, userId, userRole);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error: any) {
      if (error.message === 'Project not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }
      if (error.message === 'Access denied') {
        res.status(403).json({
          success: false,
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }

  async updateProject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const project = await projectService.updateProject(id, userId, userRole, req.body);

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: project,
      });
    } catch (error: any) {
      if (error.message === 'Project not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }
      if (error.message.includes('Only project owner')) {
        res.status(403).json({
          success: false,
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }

  async deleteProject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      await projectService.deleteProject(id, userId, userRole);

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error: any) {
      if (error.message === 'Project not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }
      if (error.message.includes('Only project owner')) {
        res.status(403).json({
          success: false,
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }
}

export default new ProjectController();
