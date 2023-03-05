import { defaultRoute } from './defaultRoute';
import request from 'supertest';
import express from 'express';

describe('defaultRoute', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use('/', defaultRoute);
  });

  it('should respond with "Hello, challenge!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, challenge!");
  });
});