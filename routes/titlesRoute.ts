import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

export const titlesRoute = Router();

const prisma = new PrismaClient()


titlesRoute.get('/:text', async (req, res) => {
    const text = req.params.text
    const title = await prisma.post.findMany({
        where: {
            title: {
                contains: text,
            }
        },
        select: {
            title: true,
        }
    });

    if (title.length === 0) {
        return res.status(404).json({
            message: `Post with title ${text} not found`,
        });
        }
    
    const plainArrayOfPosts = Object.fromEntries(Object.entries(title));
    res.json(plainArrayOfPosts);
  });