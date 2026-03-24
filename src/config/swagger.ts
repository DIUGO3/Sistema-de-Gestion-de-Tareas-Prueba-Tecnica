import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ConfigManager } from '../config/configManager';

const config = ConfigManager.getInstance();

const specs = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Gestion de Tareas API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/api/auth/register': {
      post: {
        summary: 'Registrar un nuevo usuario',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: { type: 'string', example: 'test@example.com' },
                  password: { type: 'string', example: 'Password123!' },
                  name: { type: 'string', example: 'Test User' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario registrado exitosamente',
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Iniciar sesion',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'test@example.com' },
                  password: { type: 'string', example: 'Password123!' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Inicio de sesion exitoso',
          },
        },
      },
    },
  },
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger docs disponibles en http://localhost:3000/api-docs`);
};
