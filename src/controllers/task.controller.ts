import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import taskService from '../services/task.service';

export class TaskController {
  async createTask(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const task = await taskService.createTask(projectId, userId, userRole, req.body);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
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

  async getAllTasksForProject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const result = await taskService.getAllTasksForProject(
        projectId,
        userId,
        userRole,
        req.query
      );

      res.status(200).json({
        success: true,
        count: result.tasks.length,
        data: result.tasks,
        pagination: result.pagination,
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

  async getTaskById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
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

      const task = await taskService.getTaskById(id, userId, userRole);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error: any) {
      if (error.message === 'Task not found' || error.message === 'Project not found') {
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

  async updateTask(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
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

      const task = await taskService.updateTask(id, userId, userRole, req.body);

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error: any) {
      if (error.message === 'Task not found' || error.message === 'Project not found') {
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

  async deleteTask(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
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

      await taskService.deleteTask(id, userId, userRole);

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error: any) {
      if (error.message === 'Task not found' || error.message === 'Project not found') {
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

export default new TaskController();
