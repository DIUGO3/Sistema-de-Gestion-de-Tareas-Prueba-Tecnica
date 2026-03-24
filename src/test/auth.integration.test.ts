import request from 'supertest';
import prisma from '../config/database';

jest.mock('../config/swagger', () => ({
  setupSwagger: jest.fn(),
}));

import app from '../../app';

describe('Auth Integration Tests', () => {
  const testUser = {
    email: `test_integration_${Date.now()}@example.com`,
    password: 'Password123!',
    name: 'Integration Test User',
  };

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user and return 201', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('token');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 on valid credentials', async () => {
      const credentials = {
        email: testUser.email,
        password: testUser.password,
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('token');
    });
  });
});
