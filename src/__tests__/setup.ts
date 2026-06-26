import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: './config.env' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI_TEST = process.env.MONGODB_URI_TEST;

// Increase timeout for database operations
jest.setTimeout(30000);
