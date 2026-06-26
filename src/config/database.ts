import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI =
      process.env.NODE_ENV === "test"
        ? process.env.MONGODB_URI_TEST ||
          "mongodb://localhost:27017/task-management-test"
        : process.env.MONGODB_URI ||
          "mongodb://localhost:27017/task-management";

    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    process.exit(1);
  }
};
