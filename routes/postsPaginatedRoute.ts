import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

export const postPaginatedRoute = Router();

const prisma = new PrismaClient()

postPaginatedRoute.get('/', async (req, res) => {


  const { page = 1, limit = 10 } = req.query;

  const getPosts = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      take: limit,
      skip: offset,
    });
    return posts;
  }

  res.json(await getPosts(Number(page), Number(limit)))
});