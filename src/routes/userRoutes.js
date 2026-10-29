import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';
import { validate } from '../middlewares/inputValidator.js';
import { userSchema } from '../schema/userSchema.js';

const router = Router();

router.post('/user', validate(userSchema), createUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', validate(userSchema), updateUser);
router.delete('/user/:id', deleteUser);

export default router;
