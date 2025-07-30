import express from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  content: z.string().min(1, 'Content is required')
});

const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  content: z.string().min(1, 'Content is required').optional()
});

const idSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid ID format').transform(Number)
});

// GET /api/posts - Get all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        publishDate: 'desc'
      }
    });

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = idSchema.parse(req.params);

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Post not found',
          code: 'NOT_FOUND'
        }
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/posts - Create new post
router.post('/', async (req, res, next) => {
  try {
    const { title, content } = createPostSchema.parse(req.body);

    const post = await prisma.post.create({
      data: {
        title,
        content
      }
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/posts/:id - Update post
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = idSchema.parse(req.params);
    const updateData = updatePostSchema.parse(req.body);

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Post not found',
          code: 'NOT_FOUND'
        }
      });
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = idSchema.parse(req.params);

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Post not found',
          code: 'NOT_FOUND'
        }
      });
    }

    await prisma.post.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;