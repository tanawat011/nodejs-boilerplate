import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema, updateUserSchema } from '../validations/user.validation.js';

const router = Router();

// Public routes
router.post('/', validate(createUserSchema), userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

// Protected routes
router.put('/:id', authenticate, validate(updateUserSchema), userController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), userController.remove);

export default router;
