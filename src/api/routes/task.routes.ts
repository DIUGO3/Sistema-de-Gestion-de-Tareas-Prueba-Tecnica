import { Router } from 'express';
import {
  createNewTask,
  getTasks,
  removeTask,
  updateExistingTask,
} from '../../controllers/task.controller';
import { createTaskSchema, updateTaskSchema } from '../../schemas/tasks.shema';
import { authMiddleware } from '../auth.middleware';
import { validate } from '../validation.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', validate(createTaskSchema), createNewTask);
router.put('/:id', validate(updateTaskSchema), updateExistingTask);
router.delete('/:id', removeTask);

export default router;
