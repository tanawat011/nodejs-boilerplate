import * as userService from '../services/user.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { successResponse, paginatedResponse } from '../utils/response.js';

export const create = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  successResponse(res, 201, 'User created successfully', user);
});

export const getAll = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await userService.getAll(Number(page), Number(limit));
  paginatedResponse(res, result.data, Number(page), Number(limit), result.total);
});

export const getById = catchAsync(async (req, res) => {
  const user = await userService.getById(Number(req.params.id));
  successResponse(res, 200, 'User retrieved successfully', user);
});

export const update = catchAsync(async (req, res) => {
  const user = await userService.update(Number(req.params.id), req.body);
  successResponse(res, 200, 'User updated successfully', user);
});

export const remove = catchAsync(async (req, res) => {
  await userService.remove(Number(req.params.id));
  successResponse(res, 200, 'User deleted successfully', null);
});
