import { z } from 'zod';

const taskStatusSchema = z.enum(['pending', 'in_progress', 'completed']);

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'El titulo es obligatorio'),
    description: z.string().optional(),
    dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
      message: 'La fecha debe estar en formato ISO 8601',
    }),
    status: taskStatusSchema.optional().default('pending'),
  }),
});

export const updateTaskSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, 'El titulo es obligatorio').optional(),
      description: z.string().optional(),
      dueDate: z
        .string()
        .refine((value) => !Number.isNaN(Date.parse(value)), {
          message: 'La fecha debe estar en formato ISO 8601',
        })
        .optional(),
      status: taskStatusSchema.optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: 'Debes enviar al menos un campo para actualizar',
    }),
  params: z.object({
    id: z.string().min(1, 'El id de la tarea es obligatorio'),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
