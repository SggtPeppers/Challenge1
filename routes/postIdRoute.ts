

import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

export const postIdRoute = Router();

const prisma = new PrismaClient()

postIdRoute.get('/:id', async (req, res) => {
  const postId = Number(req.params.id);

  const post = await prisma.post.findFirst({
    where: {
      id: postId
    }
  });

  if (!post) {
    return res.status(404).json({
      message: `Post with ID ${postId} not found`,
    });
  }

  const plainPost = Object.fromEntries(Object.entries(post));
  res.json(plainPost);
});
