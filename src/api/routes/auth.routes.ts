import { Router } from 'express';
import { login, register } from '../../controllers/auth.controller';
import { validate } from '../validation.middleware';
import { registerSchema, loginSchema } from '../../utils/schema';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registra un nuevo usuario
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email: { type: string }
 * password: { type: string }
 * responses:
 * 201:
 * description: Usuario creado con éxito
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Inicia sesión para obtener un token
 * tags: [Auth]
 * responses:
 * 200:
 * description: Token generado correctamente
 */
router.post('/login', validate(loginSchema), login);

export default router;