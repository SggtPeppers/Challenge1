import { Server } from 'http';
import { titlesRoute } from './titlesRoute';
import request from 'supertest';
import express from 'express';

describe('titlesRoute', () => {
  let server: Server;

  beforeAll(() => {
    const app = express();
    app.use('/', titlesRoute);
    server = app.listen();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  it('should respond with an object of post for a valid title', async () => {
    const text = 'beatae';
    const response = await request(server).get(`/${text}`);
    expect(response.status).toBe(200);
    expect(response.body[1]).toEqual(
        expect.objectContaining({
          title: 'beatae enim quia vel',
        })
      );
  });

  it('should respond with a 404 error for an invalid ID', async () => {
    const text = 'text_not_found'; // Assume this text does not exist in a title on the the database
    const response = await request(server).get(`/${text}`);
    expect(response.status).toBe(404);
  });
});