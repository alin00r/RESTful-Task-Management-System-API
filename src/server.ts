import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/database";

// Load environment variables
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
  console.log(
    `API Documentation available at http://localhost:${PORT}/api-docs`,
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection:", err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

export default server;
