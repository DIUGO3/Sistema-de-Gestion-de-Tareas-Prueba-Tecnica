import { taskRepository } from '../persistence/task.repository';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface TaskData {
  title: string;
  description?: string;
  dueDate: string | Date;
  status?: TaskStatus;
}

const normalizeDueDate = (dueDate: string | Date) =>
  typeof dueDate === 'string' ? dueDate : dueDate.toISOString();

export const getAllTasks = async (userId: string) => {
  return taskRepository.findByUserId(userId);
};

export const createTask = async (userId: string, data: TaskData) => {
  return taskRepository.create({
    title: data.title,
    description: data.description,
    dueDate: normalizeDueDate(data.dueDate),
    status: data.status ?? 'pending',
    userId,
  });
};

export const updateTask = async (taskId: string, userId: string, data: Partial<TaskData>) => {
  const existingTask = await taskRepository.findByIdAndUserId(taskId, userId);

  if (!existingTask) {
    throw new Error('Tarea no encontrada o no tienes permiso para editarla');
  }

  return taskRepository.update(taskId, {
    title: data.title,
    description: data.description,
    dueDate: data.dueDate ? normalizeDueDate(data.dueDate) : undefined,
    status: data.status,
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  const existingTask = await taskRepository.findByIdAndUserId(taskId, userId);

  if (!existingTask) {
    throw new Error('Tarea no encontrada o no tienes permiso para eliminarla');
  }

  return taskRepository.delete(taskId);
};
