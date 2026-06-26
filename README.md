# Project & Task Management System API

A production-ready RESTful API for managing projects and tasks with comprehensive authentication, role-based access control, and advanced features.

---

## 📋 Project Description

This is a full-featured **Project & Task Management System** built with Node.js, Express, and MongoDB. The API provides complete CRUD operations for projects and tasks, with secure JWT-based authentication, refresh token mechanism, role-based access control, and advanced filtering capabilities.

### Key Features

- ✅ **User Authentication**: Registration, login with JWT access & refresh tokens
- ✅ **Project Management**: Full CRUD operations with ownership and member management
- ✅ **Task Management**: Complete task lifecycle with filtering, pagination, and sorting
- ✅ **Role-Based Access Control**: Admin and Member roles with proper authorization
- ✅ **Security**: Password hashing, JWT tokens, rate limiting, input validation
- ✅ **Advanced Features**: Pagination, sorting, filtering by status/priority
- ✅ **API Documentation**: Interactive Swagger/OpenAPI documentation
- ✅ **Testing**: Unit tests with Jest and Supertest
- ✅ **Docker Support**: Full containerization with Docker Compose

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JWT (Access & Refresh Tokens) |
| **Validation** | Joi |
| **Testing** | Jest + Supertest |
| **API Documentation** | Swagger/OpenAPI |
| **Containerization** | Docker + Docker Compose |
| **Security** | Bcrypt, Helmet, Rate Limiting, CORS |

---

## 🚀 How to Run Locally

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v5 or higher
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd RESTful-Task-Management-System-API
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Copy the `.env.example` file to `config.env`:

```bash
# Windows
copy .env.example config.env

# Mac/Linux
cp .env.example config.env
```

**Edit `config.env`** and set your configuration:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/task-management

JWT_ACCESS_SECRET=your_super_secret_access_key_change_this
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
```

⚠️ **Important**: Change the JWT secrets before running in production!

### Step 4: Start MongoDB

Ensure MongoDB is running on your system:

```bash
# Windows - run mongod.exe
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Verify MongoDB is running
mongosh
```

### Step 5: Start the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

### Step 6: Access the API

The server will start at: **http://localhost:3000**

- **Health Check**: http://localhost:3000/health
- **API Documentation**: http://localhost:3000/api-docs

---

## 🐳 Run with Docker

### Using Docker Compose (Recommended)

```bash
# Start both API and MongoDB
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The API will be available at: **http://localhost:3000**

---

## 📚 .env.example

See the complete environment variables template in `.env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/task-management
MONGODB_URI_TEST=mongodb://localhost:27017/task-management-test

# JWT Configuration
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Bcrypt
BCRYPT_SALT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

---

## 🗄️ Database Schema

### Database Models

**Collections:**
- `users` - User accounts with authentication
- `projects` - Projects with ownership and members
- `tasks` - Tasks linked to projects

**Indexes:**
- User email (unique)
- Project owner, members, status
- Task project, status, priority, dueDate
- Compound indexes for common queries

---

## 📮 API Documentation

### Option 1: Swagger/OpenAPI (Interactive)

**URL**: http://localhost:3000/api-docs

Features:
- ✅ Try out all endpoints directly in the browser
- ✅ Complete request/response schemas
- ✅ Authentication flows
- ✅ Real-time testing

### Option 2: Postman Collection

**File**: `postman_collection.json`

**How to use:**
1. Open Postman
2. Click **Import**
3. Select `postman_collection.json`
4. The collection includes:
   - All 16 API endpoints
   - Auto-saving of tokens
   - Pre-configured examples
   - Environment variables

**Collection Features:**
- Automatic token management
- Request examples for all endpoints
- Test scripts that save IDs
- Ready-to-use workflows

---

## 🎯 API Endpoints Summary

### Authentication (5 endpoints)
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
POST   /api/auth/refresh-token   - Refresh access token
POST   /api/auth/logout          - Logout user
GET    /api/auth/profile         - Get user profile
```

### Projects (5 endpoints)
```
POST   /api/projects             - Create project
GET    /api/projects             - Get all user projects
GET    /api/projects/:id         - Get project by ID
PUT    /api/projects/:id         - Update project
DELETE /api/projects/:id         - Delete project
```

### Tasks (5 endpoints)
```
POST   /api/tasks/project/:projectId              - Create task
GET    /api/tasks/project/:projectId              - Get all tasks (with filters)
GET    /api/tasks/:id                             - Get task by ID
PUT    /api/tasks/:id                             - Update task
DELETE /api/tasks/:id                             - Delete task
```

### Utility
```
GET    /health                   - Health check
GET    /api-docs                 - API documentation
```

**Total**: 16 endpoints

---

## 🔍 API Usage Examples

### 1. Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a Project

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Website Redesign",
    "description": "Complete redesign of company website",
    "status": "active"
  }'
```

### 4. Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks/project/PROJECT_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Homepage",
    "description": "Create mockups for homepage",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-12-31T23:59:59.000Z"
  }'
```

### 5. Get Tasks with Filtering

```bash
curl -X GET "http://localhost:3000/api/tasks/project/PROJECT_ID?status=in-progress&priority=high&page=1&limit=10&sortBy=dueDate&sortOrder=asc" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Query Parameters:**
- `status` - Filter by status (pending, in-progress, done)
- `priority` - Filter by priority (low, medium, high, urgent)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (createdAt, dueDate, priority, etc.)
- `sortOrder` - Sort direction (asc, desc)

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
```

### Test Coverage

- Authentication flows
- Registration validation
- Login validation
- JWT protection
- Error handling
- Input validation

**Coverage Goal**: 80%+

---

## 📁 Project Structure

```
RESTful-Task-Management-System-API/
├── src/
│   ├── __tests__/              # Test files
│   │   ├── auth.test.ts
│   │   └── setup.ts
│   ├── config/                 # Configuration
│   │   ├── database.ts
│   │   └── swagger.ts
│   ├── controllers/            # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   └── task.controller.ts
│   ├── middlewares/            # Custom middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── models/                 # Database models
│   │   ├── User.ts
│   │   ├── Project.ts
│   │   └── Task.ts
│   ├── routes/                 # API routes
│   │   ├── auth.routes.ts
│   │   ├── project.routes.ts
│   │   └── task.routes.ts
│   ├── services/               # Business logic
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   └── task.service.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Utilities
│   │   └── jwt.ts
│   ├── validators/             # Input validators
│   │   ├── auth.validator.ts
│   │   ├── project.validator.ts
│   │   └── task.validator.ts
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
│
├── .env.example                # Environment variables template
├── .dockerignore
├── .gitignore
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Docker configuration
├── jest.config.js              # Jest configuration
├── package.json
├── tsconfig.json               # TypeScript configuration
├── postman_collection.json     # Postman collection
└── README.md                   # This file
```

---

## 🔒 Security Features

- ✅ **Password Hashing**: Bcrypt with 12 salt rounds
- ✅ **JWT Authentication**: Access (15min) + Refresh (7d) tokens
- ✅ **Token Rotation**: Refresh tokens are rotated on use
- ✅ **Rate Limiting**: 100 requests per 15 minutes per IP
- ✅ **Input Validation**: Comprehensive Joi schemas
- ✅ **SQL Injection Protection**: Mongoose ODM
- ✅ **XSS Protection**: Input sanitization
- ✅ **CORS**: Configurable allowed origins
- ✅ **Helmet**: Security headers
- ✅ **Role Protection**: Users cannot self-promote to admin

---

## 👥 Role-Based Access Control

### Roles

**Admin:**
- View all projects
- Full CRUD on all resources
- Promote users to admin (via database)

**Member (Default):**
- View only owned/assigned projects
- CRUD on owned projects
- CRUD on tasks in accessible projects

### Security Note

⚠️ **Users cannot set their own role during registration**. All new users are created as 'member'. Only database administrators can promote users to 'admin' role.

---

## 🐛 Error Handling

### Consistent Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## 📝 Important Implementation Notes

### 1. Architecture

**Layered Architecture Pattern:**
```
Routes → Controllers → Services → Models → Database
```

- **Routes**: Define endpoints and apply middleware
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define database schemas

### 2. Authentication Flow

**Access Token** (Short-lived: 15 minutes)
- Used for API requests
- Stored in memory/localStorage on client

**Refresh Token** (Long-lived: 7 days)
- Used to get new access tokens
- Stored in database for validation
- Maximum 5 active tokens per user
- Rotated on each use for security

### 3. Database Design

**Relationships:**
- User ← owns → Projects
- User ← member of → Projects
- Project ← contains → Tasks
- User ← creates → Tasks
- User ← assigned to → Tasks

**Cascade Operations:**
- Deleting a project deletes all its tasks
- Automatic cleanup of old refresh tokens

### 4. Input Validation

Two-layer validation:
1. **Schema Validation** (Joi): Type, format, required fields
2. **Business Logic**: Authorization, relationships, constraints

### 5. Performance Optimization

- Database indexing on frequently queried fields
- Compound indexes for common query patterns
- Pagination to limit result sets
- Lean queries when population not needed

### 6. Security Considerations

**Before Production:**
- ✅ Change all JWT secrets
- ✅ Set strong MongoDB credentials
- ✅ Configure proper CORS origins
- ✅ Set up HTTPS
- ✅ Enable MongoDB authentication
- ✅ Review rate limiting settings
- ✅ Set up monitoring and logging

### 7. Known Limitations

- File uploads not implemented
- Email notifications not implemented
- Real-time updates (WebSockets) not included
- Full-text search not implemented
- Audit logs not tracked

### 8. Future Enhancements

- Email verification for new accounts
- Password reset functionality
- Email notifications for task assignments
- Task comments and attachments
- Time tracking
- Project templates
- Advanced analytics and reporting
- Two-factor authentication

### 9. Testing Strategy

**Current Coverage:**
- Authentication endpoints
- User registration validation
- Login flows
- JWT protection

**To Add:**
- Project CRUD tests
- Task CRUD tests
- Authorization tests
- Integration tests

### 10. Deployment Recommendations

**Environment:**
- Use managed MongoDB (MongoDB Atlas)
- Deploy on Node.js hosting (Heroku, DigitalOcean, AWS)
- Set up CI/CD pipeline
- Configure environment variables securely

**Monitoring:**
- Application logging (Winston)
- Error tracking (Sentry)
- Performance monitoring
- Database monitoring

---

## 📞 Support

For issues or questions:
- Review the **Swagger documentation** at `/api-docs`
- Check the **Postman collection** for examples
- Review the **implementation notes** above

---

## 📄 License

ISC

---

## 👤 Author

**Ali Nour**

---

## 🎉 Acknowledgments

Built with industry best practices for:
- RESTful API design
- Secure authentication
- Clean architecture
- TypeScript implementation
- Production-ready code

---

**Ready for deployment and production use! 🚀**
