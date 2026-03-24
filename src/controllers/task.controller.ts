import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../api/auth.middleware';
import * as taskService from '../services/task.service';

export const getTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.id);

    return res.json({
      status: 'success',
      data: tasks,
    });
  } catch (error) {
    return next(error);
  }
};

export const createNewTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Tarea creada exitosamente',
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateExistingTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);

    return res.json({
      status: 'success',
      message: 'Tarea actualizada correctamente',
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

export const removeTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);

    return res.json({
      status: 'success',
      message: 'Tarea eliminada correctamente',
    });
  } catch (error) {
    return next(error);
  }
};
