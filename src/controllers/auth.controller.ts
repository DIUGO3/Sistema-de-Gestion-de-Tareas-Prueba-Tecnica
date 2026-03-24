import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    
    // Llamamos al servicio de registro
    const result = await authService.registerUser({ email, password, name });
    
    // Respondemos con el usuario creado y el token
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      data: result
    });
  } catch (error) {
    // Enviamos el error al middleware de errores centralizado
    next(error); 
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    // Llamamos al servicio de login
    const result = await authService.loginUser({ email, password, name: '' });
    
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación o email existente
 */