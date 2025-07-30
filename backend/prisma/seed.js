import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(" Starting database seed...");

  // Clear existing data
  await prisma.post.deleteMany();
  console.log("  Cleared existing posts");

  // Create sample blog posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "Welcome to My Portfolio",
        content: `# Welcome to My Portfolio

This is my first blog post on my new portfolio website! I'm excited to share my journey as a developer and showcase the projects I'm working on.

## What You'll Find Here

- Technical articles about web development
- Project showcases and case studies
- Thoughts on modern development practices
- Updates on my learning journey

## Tech Stack

This portfolio is built with:
- **Frontend**: React with modern hooks and routing
- **Backend**: Node.js with Express and Prisma ORM
- **Database**: PostgreSQL
- **Deployment**: AWS S3 (frontend) and Raspberry Pi (backend)

Stay tuned for more content!`,
        publishDate: new Date("2024-01-15T10:30:00Z"),
      },
      {
        title: "Building Modern Web Applications with React and Prisma",
        content: `# Building Modern Web Applications with React and Prisma

In this post, I'll share my experience building full-stack applications using React for the frontend and Prisma as the database ORM.

## Why Prisma?

Prisma offers several advantages:

1. **Type Safety**: Auto-generated TypeScript types
2. **Developer Experience**: Excellent tooling and IDE support
3. **Database Migrations**: Version-controlled schema changes
4. **Query Performance**: Optimized database queries

## Project Architecture

The architecture follows a clean separation of concerns:

\`\`\`
Frontend (React) ↔ API (Express) ↔ Database (PostgreSQL)
\`\`\`

## Key Features

- RESTful API design
- Input validation with Zod
- Error handling middleware
- Logging with Winston
- CORS configuration for cross-origin requests

This setup provides a solid foundation for scalable web applications.`,
        publishDate: new Date("2024-01-20T14:15:00Z"),
      },
      {
        title: "Deployment Strategies: AWS S3 and Raspberry Pi",
        content: `# Deployment Strategies: AWS S3 and Raspberry Pi

For this portfolio project, I chose an interesting hybrid deployment approach that balances cost-effectiveness with learning opportunities.

## Frontend Deployment: AWS S3

**Advantages:**
- Static hosting with global CDN via CloudFront
- Automatic scaling and high availability
- Cost-effective for static sites
- Easy integration with GitHub Actions

**Setup Process:**
1. Build React application
2. Upload to S3 bucket configured for static hosting
3. Configure CloudFront distribution
4. Set up custom domain with Route 53

## Backend Deployment: Raspberry Pi

**Why Raspberry Pi?**
- Learning experience with self-hosting
- Full control over the environment
- Cost-effective for small applications
- Great for understanding DevOps concepts

**Configuration:**
- Node.js runtime with PM2 process manager
- PostgreSQL database
- Nginx reverse proxy (optional)
- Automated deployment scripts

This hybrid approach provides the best of both worlds: reliable, scalable frontend hosting and hands-on backend management experience.`,
        publishDate: new Date("2024-01-25T09:45:00Z"),
      },
    ],
  });

  console.log(` Created ${posts.count} sample posts`);
  console.log(" Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(" Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
