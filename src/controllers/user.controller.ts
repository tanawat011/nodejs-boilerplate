import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { successResponse, paginatedResponse } from '../utils/response.js';

export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.create(req.body);
  successResponse(res, 201, 'User created successfully', user);
});

export const getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await userService.getAll(page, limit);
  paginatedResponse(res, result.data, page, limit, result.total);
});

export const getById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.getById(Number(req.params.id));
  successResponse(res, 200, 'User retrieved successfully', user);
});

export const update = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.update(Number(req.params.id), req.body);
  successResponse(res, 200, 'User updated successfully', user);
});

export const remove = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await userService.remove(Number(req.params.id));
  successResponse(res, 200, 'User deleted successfully', null);
});
