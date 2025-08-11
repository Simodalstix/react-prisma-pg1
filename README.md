# Fullstack Portfolio Project

This project ships with CI/CD using GitHub Actions (build, test, and deploy). I’m extending it to full automation: the frontend will be provisioned with Terraform, and Jenkins will coordinate the end-to-end pipeline — from bare-metal/bootstrap through build, config, and deploy — so the entire stack can be recreated from zero with minimal manual steps.

## Technology Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL, Winston  
**Deployment:** Docker, GitHub Actions, AWS S3, AWS RDS

## Project Structure

```
fullstack-portfolio-project/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Route components
│   │   ├── hooks/      # Custom hooks
│   │   ├── services/   # API layer
│   │   └── utils/      # Utilities
│   └── public/         # Static assets
├── backend/            # Express.js API
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Express middleware
│   │   └── server.js   # Entry point
│   └── prisma/         # Database schema
└── docker-compose.yml  # Development environment
```

## Features

- Blog management system (CRUD operations)
- RESTful API with validation and error handling
- Responsive design
- PostgreSQL database with Prisma ORM
- Health check endpoints

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Quick Start

1. **Clone and setup backend:**

   ```bash
   git clone <repository-url>
   cd fullstack-portfolio-project/backend
   npm install
   cp .env.example .env.local
   # Configure DATABASE_URL in .env.local
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```

2. **Setup frontend:**

   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Configure VITE_API_BASE_URL in .env
   npm run dev
   ```

3. **Docker alternative:**
   ```bash
   docker-compose up -d
   ```

## Environment Configuration

**Backend (.env.local):**

```
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Portfolio Project
```

## Configuration

**ECR Toggle**: This setting controls whether the CI/CD pipeline uses AWS ECR for Docker images. To disable ECR and use local Docker builds, set `enable_ecr = false` in the `infra/terraform.tfvars` file. When disabled, the deployment pipeline skips the image push to a registry. The default is `true`.

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /health` - Health check

## Deployment

**Production Infrastructure:**

- Frontend: AWS S3 static hosting
- Backend: Containerized on AWS ECS/EC2
- Database: AWS RDS PostgreSQL
- CI/CD: GitHub Actions

**Pipeline:** Code push → Testing → Build → Security scan → Deploy → Health check

## Security & Performance

- Helmet.js security headers
- CORS configuration
- Input validation with Zod
- Prisma ORM (SQL injection prevention)
- Vite fast builds
- Database connection pooling
- Structured logging with Winston

## License

Built for demonstration of modern web development practices and deployment strategies.
