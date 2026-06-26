import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required().messages({
    'string.empty': 'Task title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 200 characters',
  }),
  description: Joi.string().trim().max(1000).required().messages({
    'string.empty': 'Task description is required',
    'string.max': 'Description cannot exceed 1000 characters',
  }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'done')
    .default('pending'),
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'urgent')
    .default('medium'),
  dueDate: Joi.date().iso().greater('now').optional().messages({
    'date.greater': 'Due date must be in the future',
  }),
  assignedTo: Joi.string().hex().length(24).optional().messages({
    'string.hex': 'Invalid user ID format',
    'string.length': 'Invalid user ID format',
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).messages({
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 200 characters',
  }),
  description: Joi.string().trim().max(1000).messages({
    'string.max': 'Description cannot exceed 1000 characters',
  }),
  status: Joi.string().valid('pending', 'in-progress', 'done'),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  dueDate: Joi.date().iso().greater('now').allow(null).messages({
    'date.greater': 'Due date must be in the future',
  }),
  assignedTo: Joi.string().hex().length(24).allow(null).messages({
    'string.hex': 'Invalid user ID format',
    'string.length': 'Invalid user ID format',
  }),
}).min(1);

export const taskIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Task ID is required',
    'string.hex': 'Invalid task ID format',
    'string.length': 'Invalid task ID format',
  }),
});

export const projectIdSchema = Joi.object({
  projectId: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Project ID is required',
    'string.hex': 'Invalid project ID format',
    'string.length': 'Invalid project ID format',
  }),
});

export const taskFilterSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'done'),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  assignedTo: Joi.string().hex().length(24),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string()
    .valid('createdAt', 'updatedAt', 'dueDate', 'priority', 'status', 'title')
    .default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});
