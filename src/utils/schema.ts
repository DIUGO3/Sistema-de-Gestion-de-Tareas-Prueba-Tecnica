import { z } from 'zod';

// Esquema para el Registro de Usuario
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Email no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    name: z.string().optional(),
  }),
});

// Esquema para el Login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email no válido'),
    password: z.string().min(1, 'La contraseña es requerida'),
  }),
});

// Esquema para Crear/Actualizar Tareas
export const taskSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100),
    description: z.string().max(500).optional(),
    dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de fecha inválido (debe ser ISO 8601)",
    }),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
  }),
});