import { Server } from 'http';
import { postIdRoute } from './postIdRoute';
import request from 'supertest';
import express from 'express';

describe('postIdRoute', () => {
  let server: Server;

  beforeAll(() => {
    const app = express();
    app.use('/', postIdRoute);
    server = app.listen();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  it('should respond with a post object for a valid ID', async () => {
    const postId = 1;
    const response = await request(server).get(`/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.objectContaining({
          id: postId,
        })
      );
  });

  it('should respond with a 404 error for an invalid ID', async () => {
    const postId = 999; // Assume this ID does not exist in the database
    const response = await request(server).get(`/${postId}`);
    expect(response.status).toBe(404);
  });
});