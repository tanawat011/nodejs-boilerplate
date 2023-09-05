import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { ApiError } from '../utils/apiError.js';

const SALT_ROUNDS = 10;

// Fields to exclude from responses
const sanitizeUser = (user) => {
  const { password, ...sanitized } = user;
  return sanitized;
};

export const create = async (data) => {
  // Check if email already exists
  const existingEmail = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingEmail) {
    throw new ApiError(409, 'Email already exists');
  }

  // Check if username already exists
  const existingUsername = await prisma.user.findUnique({ where: { username: data.username } });
  if (existingUsername) {
    throw new ApiError(409, 'Username already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return sanitizeUser(user);
};

export const getAll = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return { data, total };
};

export const getById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      fullName: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const update = async (id, data) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Check email uniqueness if updating
  if (data.email && data.email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new ApiError(409, 'Email already exists');
    }
  }

  // Check username uniqueness if updating
  if (data.username && data.username !== user.username) {
    const existing = await prisma.user.findUnique({ where: { username: data.username } });
    if (existing) {
      throw new ApiError(409, 'Username already exists');
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  return sanitizeUser(updatedUser);
};

export const remove = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await prisma.user.delete({ where: { id } });
};
