import swaggerJsdoc from "swagger-jsdoc";

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project & Task Management API",
      version: "1.0.0",
      description:
        "A RESTful API for managing projects and tasks with user authentication and role-based access control",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "/",
        description: "Default server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["admin", "member"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["active", "on-hold", "completed", "archived"],
            },
            owner: {
              type: "string",
            },
            members: {
              type: "array",
              items: {
                type: "string",
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["pending", "in-progress", "done"],
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "urgent"],
            },
            dueDate: {
              type: "string",
              format: "date-time",
            },
            project: {
              type: "string",
            },
            assignedTo: {
              type: "string",
            },
            createdBy: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization endpoints",
      },
      {
        name: "Projects",
        description: "Project management endpoints",
      },
      {
        name: "Tasks",
        description: "Task management endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};
