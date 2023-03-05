import { Server } from 'http';
import { commentsRoute } from './commentsRoute';
import request from 'supertest';
import express from 'express';

describe('commentsRoute', () => {
  let server: Server;

  beforeAll(() => {
    const app = express();
    app.use('/', commentsRoute);
    server = app.listen();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  it('should respond with a post object for a valid postId', async () => {
    const postId = 1;
    const response = await request(server).get(`/${postId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});