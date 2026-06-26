import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed' | 'archived';
  owner: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  project: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'member';
  };
}

export interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'member';
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TaskFilterQuery extends PaginationQuery {
  status?: 'pending' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
