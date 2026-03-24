import prisma from '../config/database';

export interface CreateTaskRecord {
  title: string;
  description?: string;
  dueDate: string;
  status: string;
  userId: string;
}

export interface UpdateTaskRecord {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: string;
}

class TaskRepository {
  async findByUserId(userId: string) {
    return prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateTaskRecord) {
    return prisma.task.create({ data });
  }

  async findByIdAndUserId(id: string, userId: string) {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  }

  async update(id: string, data: UpdateTaskRecord) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.task.delete({
      where: { id },
    });
  }
}

export const taskRepository = new TaskRepository();
