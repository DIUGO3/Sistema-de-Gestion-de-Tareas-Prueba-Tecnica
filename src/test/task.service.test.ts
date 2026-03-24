import { taskRepository } from '../persistence/task.repository';
import { createTask, deleteTask, getAllTasks, updateTask } from '../services/task.service';

jest.mock('../persistence/task.repository', () => ({
  taskRepository: {
    findByUserId: jest.fn(),
    create: jest.fn(),
    findByIdAndUserId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockTaskRepository = taskRepository as jest.Mocked<typeof taskRepository>;

describe('Task Service Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list tasks for a user', async () => {
    const tasks = [
      {
        id: 'task-1',
        title: 'Preparar entrega',
        description: 'Terminar prueba',
        dueDate: '2026-03-30T18:00:00.000Z',
        status: 'pending',
        userId: 'user-1',
      },
    ];

    mockTaskRepository.findByUserId.mockResolvedValue(tasks as never);

    const result = await getAllTasks('user-1');

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.findByUserId).toHaveBeenCalledWith('user-1');
  });

  it('should create a task with default pending status', async () => {
    const createdTask = {
      id: 'task-1',
      title: 'Preparar entrega',
      description: 'Terminar prueba',
      dueDate: '2026-03-30T18:00:00.000Z',
      status: 'pending',
      userId: 'user-1',
    };

    mockTaskRepository.create.mockResolvedValue(createdTask as never);

    const result = await createTask('user-1', {
      title: 'Preparar entrega',
      description: 'Terminar prueba',
      dueDate: '2026-03-30T18:00:00.000Z',
    });

    expect(result).toEqual(createdTask);
    expect(mockTaskRepository.create).toHaveBeenCalledWith({
      title: 'Preparar entrega',
      description: 'Terminar prueba',
      dueDate: '2026-03-30T18:00:00.000Z',
      status: 'pending',
      userId: 'user-1',
    });
  });

  it('should update a task only when it belongs to the user', async () => {
    mockTaskRepository.findByIdAndUserId.mockResolvedValue({ id: 'task-1', userId: 'user-1' } as never);
    mockTaskRepository.update.mockResolvedValue({
      id: 'task-1',
      title: 'Entrega final',
      userId: 'user-1',
    } as never);

    const result = await updateTask('task-1', 'user-1', {
      title: 'Entrega final',
      status: 'completed',
    });

    expect(result).toEqual({
      id: 'task-1',
      title: 'Entrega final',
      userId: 'user-1',
    });
    expect(mockTaskRepository.findByIdAndUserId).toHaveBeenCalledWith('task-1', 'user-1');
    expect(mockTaskRepository.update).toHaveBeenCalledWith('task-1', {
      title: 'Entrega final',
      description: undefined,
      dueDate: undefined,
      status: 'completed',
    });
  });

  it('should throw when updating a task that does not belong to the user', async () => {
    mockTaskRepository.findByIdAndUserId.mockResolvedValue(null as never);

    await expect(updateTask('task-1', 'user-1', { title: 'Entrega final' })).rejects.toThrow(
      'Tarea no encontrada o no tienes permiso para editarla',
    );
  });

  it('should delete a task only when it belongs to the user', async () => {
    mockTaskRepository.findByIdAndUserId.mockResolvedValue({ id: 'task-1', userId: 'user-1' } as never);
    mockTaskRepository.delete.mockResolvedValue({ id: 'task-1' } as never);

    await deleteTask('task-1', 'user-1');

    expect(mockTaskRepository.findByIdAndUserId).toHaveBeenCalledWith('task-1', 'user-1');
    expect(mockTaskRepository.delete).toHaveBeenCalledWith('task-1');
  });
});
