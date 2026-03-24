import prisma from '../config/database';
import { comparePassword, hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const registerUser = async (data: { email: string; password: string; name: string }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });

  const token = generateToken({ id: user.id, email: user.email, name: user.name });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
};

export const loginUser = async (data: { email: string; password: string; name: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken({ id: user.id, email: user.email, name: user.name });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
};
