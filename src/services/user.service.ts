import bcrypt from 'bcryptjs';
import type { User } from '@prisma/client';
import prisma from '../config/database.js';
import { ApiError } from '../utils/apiError.js';

const SALT_ROUNDS = 10;

type SafeUser = Omit<User, 'password'>;

interface CreateUserData {
  email: string;
  username: string;
  password: string;
  fullName?: string;
}

interface UpdateUserData {
  email?: string;
  username?: string;
  fullName?: string;
  role?: 'ADMIN' | 'USER';
  isActive?: boolean;
}

interface PaginatedResult {
  data: SafeUser[];
  total: number;
}

const sanitizeUser = (user: User): SafeUser => {
  const { password: _, ...sanitized } = user;
  return sanitized;
};

const userSelect = {
  id: true,
  email: true,
  username: true,
  fullName: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const create = async (data: CreateUserData): Promise<SafeUser> => {
  const existingEmail = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingEmail) {
    throw new ApiError(409, 'Email already exists');
  }

  const existingUsername = await prisma.user.findUnique({ where: { username: data.username } });
  if (existingUsername) {
    throw new ApiError(409, 'Username already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return sanitizeUser(user);
};

export const getAll = async (page = 1, limit = 10): Promise<PaginatedResult> => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: userSelect,
    }),
    prisma.user.count(),
  ]);

  return { data, total };
};

export const getById = async (id: number): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const update = async (id: number, data: UpdateUserData): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (data.email && data.email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new ApiError(409, 'Email already exists');
    }
  }

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

export const remove = async (id: number): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await prisma.user.delete({ where: { id } });
};
