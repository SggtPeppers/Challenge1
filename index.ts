import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Type } from '@sinclair/typebox';
import { PrismaClient } from '@prisma/client'
import { postPaginatedRoute } from './routes/postsPaginatedRoute';
import { defaultRoute } from './routes/defaultRoute';
import { postIdRoute } from './routes/postIdRoute';
import { commentsRoute } from './routes/commentsRoute';
import { titlesRoute } from './routes/titlesRoute';
const axios = require('axios').default;

const prisma = new PrismaClient()

dotenv.config();

export const app: Express = express();
export const routes = express.Router();
const port = process.env.PORT;

const postType = Type.Object({
  id: Type.Number(),
  userId: Type.Number(),
  title: Type.String(),
  body: Type.String(),
});

const userType = Type.Object({
  id: Type.Number(),
  email: Type.String(),
  name: Type.String(),
});

const commentType = Type.Object({
  id: Type.Number(),
  postId: Type.Number(),
  name: Type.String(),
  email: Type.String(),
  body: Type.String(),
});

const getUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  const users = response.data;

  const data: any = [];

  users.map((user: typeof userType) => {
    data.push({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  })

  await prisma.user.createMany({
    data,
    skipDuplicates: true,
  })
}

const getPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const posts: any = response.data

  const data: any = [];

  posts.map((post: typeof postType) => {
    data.push({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    })
  })

  await prisma.post.createMany({
    data,
    skipDuplicates: true,
  })  
}

const getComments = async () => {

  const posts = await prisma.post.findMany();
  posts.map(async (post) => {
    const postId = post.id;

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const comments = response.data;

    const data: any = [];

    comments.map((comment: typeof commentType) => {
      data.push({
        id: comment.id,
        postId: comment.postId,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      })
    })

    await prisma.comment.createMany({
      data,
      skipDuplicates: true,
    })
  })
  }

app.use('/', defaultRoute);

app.use('/posts', postPaginatedRoute);

app.use('/post', postIdRoute)

app.use('/comments', commentsRoute)

app.use('/title', titlesRoute)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

getUsers();
getPosts();
getComments();
