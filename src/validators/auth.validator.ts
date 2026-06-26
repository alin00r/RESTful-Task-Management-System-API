import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().min(6).max(128).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot exceed 128 characters",
  }),
  // Role is not allowed in registration - always defaults to 'member'
  // Only admins can change user roles after creation
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refresh token is required",
  }),
});
