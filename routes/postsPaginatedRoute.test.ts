import { Server } from 'http';
import { postPaginatedRoute } from './postsPaginatedRoute';
import request from 'supertest';
import express from 'express';

describe('postPaginatedRoute', () => {
  let server: Server;

  beforeAll(() => {
    const app = express();
    app.use('/', postPaginatedRoute);
    server = app.listen();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  it('should respond with an array', async () => {
    const response = await request(server).get(`/`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].id).toBe(1);
  });
});