import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

export const commentsRoute = Router();

const prisma = new PrismaClient()

commentsRoute.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const getComments = async (postId: number) => {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            }
        });
        return comments;
    }

    res.json(await getComments(Number(postId)))
  });