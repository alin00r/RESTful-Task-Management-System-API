import Joi from 'joi';

export const createProjectSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'Project title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().trim().max(500).required().messages({
    'string.empty': 'Project description is required',
    'string.max': 'Description cannot exceed 500 characters',
  }),
  status: Joi.string()
    .valid('active', 'on-hold', 'completed', 'archived')
    .default('active'),
  members: Joi.array().items(Joi.string()).default([]),
});

export const updateProjectSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).messages({
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().trim().max(500).messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),
  status: Joi.string().valid('active', 'on-hold', 'completed', 'archived'),
  members: Joi.array().items(Joi.string()),
}).min(1);

export const projectIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Project ID is required',
    'string.hex': 'Invalid project ID format',
    'string.length': 'Invalid project ID format',
  }),
});
