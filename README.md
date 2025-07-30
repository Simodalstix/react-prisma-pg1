# Fullstack Portfolio Project

A modern fullstack web application built to demonstrate a complete development workflow including frontend, backend, database, hosting, and CI/CD deployment.

## Technology Stack

### Frontend

- **React 19** - Modern UI library with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Prisma ORM** - Type-safe database client and schema management
- **PostgreSQL** - Relational database
- **Winston** - Structured logging
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development & Deployment

- **Docker** - Containerization for consistent environments
- **GitHub Actions** - CI/CD pipeline automation
- **AWS S3** - Static website hosting for frontend
- **AWS RDS** - Managed PostgreSQL database
- **Environment-based configuration** - Separate configs for development and production

## Project Structure

```
fullstack-portfolio-project/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route-based page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API communication layer
│   │   └── utils/          # Utility functions and constants
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   └── server.js       # Application entry point
│   ├── prisma/             # Database schema and migrations
│   └── package.json        # Backend dependencies
├── docker-compose.yml       # Local development environment
└── ARCHITECTURE.md         # Detailed system architecture
```

## Features

### Blog Management System

- Create, read, update, and delete blog posts
- Rich text content with title, content, and metadata
- Responsive design for mobile and desktop
- Real-time error handling and loading states

### API Architecture

- RESTful API design with proper HTTP methods
- Comprehensive error handling and logging
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Health check endpoints for monitoring

### Database Design

- Normalized PostgreSQL schema
- Prisma migrations for version control
- Seed data for development and testing
- Connection pooling and optimization

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Docker and Docker Compose (optional)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fullstack-portfolio-project
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env.local
   # Configure database connection in .env.local
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure API endpoint in .env
   npm run dev
   ```

4. **Docker Development (Alternative)**
   ```bash
   docker-compose up -d
   ```

## Environment Configuration

### Backend (.env.local)

```
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=debug
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Portfolio Project
```

## Deployment Architecture

### Production Infrastructure

- **Frontend**: Static files deployed to AWS S3 with CloudFront CDN
- **Backend**: Containerized Node.js application on AWS ECS or EC2
- **Database**: AWS RDS PostgreSQL with automated backups
- **CI/CD**: GitHub Actions for automated testing and deployment

### CI/CD Pipeline

1. **Code Push** - Developer pushes to main branch
2. **Automated Testing** - Run unit tests and integration tests
3. **Build Process** - Create optimized production builds
4. **Security Scanning** - Vulnerability assessment
5. **Deployment** - Deploy to staging then production environments
6. **Health Checks** - Verify deployment success

## API Documentation

### Blog Posts Endpoints

- `GET /api/posts` - Retrieve all blog posts
- `GET /api/posts/:id` - Retrieve specific blog post
- `POST /api/posts` - Create new blog post
- `PUT /api/posts/:id` - Update existing blog post
- `DELETE /api/posts/:id` - Delete blog post

### Health Check

- `GET /health` - Application and database health status

## Database Schema

### Posts Table

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

- Helmet.js for security headers
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Environment variable protection
- SQL injection prevention through Prisma ORM
- Rate limiting and request size limits

## Performance Optimizations

- Vite for fast development builds
- React code splitting and lazy loading
- Database connection pooling
- Compressed static assets
- CDN distribution for global performance

## Monitoring and Logging

- Structured logging with Winston
- Request/response logging
- Error tracking and alerting
- Database query monitoring
- Application health checks

## Testing Strategy

- Unit tests for individual components and functions
- Integration tests for API endpoints
- End-to-end testing for user workflows
- Database migration testing
- Performance and load testing

## Contributing

This project demonstrates modern fullstack development practices including:

- Clean architecture and separation of concerns
- Type-safe database operations
- Responsive frontend design
- Comprehensive error handling
- Production-ready deployment configuration
- Automated CI/CD workflows

## License

This project is built for demonstration purposes to showcase modern web development practices and deployment strategies.
