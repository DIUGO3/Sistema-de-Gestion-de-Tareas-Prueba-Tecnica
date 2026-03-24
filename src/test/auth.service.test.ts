import prisma from '../config/database';
import { loginUser, registerUser } from '../services/auth.service';

jest.mock('../config/database', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockUser = prisma.user as jest.Mocked<typeof prisma.user>;

jest.mock('../utils/hash', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
  comparePassword: jest.fn().mockResolvedValue(true),
}));

jest.mock('../utils/jwt', () => ({
  generateToken: jest.fn().mockReturnValue('fake_jwt_token'),
}));

describe('Auth Service Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user and return a token', async () => {
      const input = { email: 'test@test.com', password: 'password123', name: 'Test User' };

      mockUser.findUnique.mockResolvedValue(null);
      mockUser.create.mockResolvedValue({
        id: 'user-1',
        email: input.email,
        password: 'hashed_password',
        name: input.name,
        createdAt: new Date(),
      });

      const result = await registerUser(input);

      expect(result).toHaveProperty('token', 'fake_jwt_token');
      expect(result).toHaveProperty('user.id', 'user-1');
      expect(mockUser.create).toHaveBeenCalled();
    });

    it('should throw an error if email already exists', async () => {
      const input = { email: 'existing@test.com', password: 'password123', name: 'Existing User' };

      mockUser.findUnique.mockResolvedValue({
        id: 'user-2',
        email: input.email,
        password: 'hashed_password',
        name: input.name,
        createdAt: new Date(),
      });

      await expect(registerUser(input)).rejects.toThrow('Email already registered');
    });
  });

  describe('loginUser', () => {
    it('should return a token when credentials are valid', async () => {
      const input = { email: 'test@test.com', password: 'password123', name: 'Test User' };
      const dbUser = {
        id: 'user-1',
        email: input.email,
        password: 'hashed_password',
        name: input.name,
        createdAt: new Date(),
      };

      mockUser.findUnique.mockResolvedValue(dbUser);

      const result = await loginUser(input);

      expect(result).toHaveProperty('token', 'fake_jwt_token');
      expect(result).toHaveProperty('user.id', 'user-1');
      expect(mockUser.findUnique).toHaveBeenCalledWith({
        where: { email: input.email },
      });
    });

    it('should throw an error for invalid credentials', async () => {
      mockUser.findUnique.mockResolvedValue(null);

      await expect(loginUser({ email: 'wrong@test.com', password: '123', name: 'Wrong User' }))
        .rejects.toThrow('Credenciales inválidas');
    });
  });
});
