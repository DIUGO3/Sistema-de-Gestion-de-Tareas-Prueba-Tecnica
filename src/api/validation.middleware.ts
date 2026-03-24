import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validamos body, query y params según el esquema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Usamos .issues que es la propiedad nativa de ZodError
        return res.status(400).json({
          status: 'error',
          message: 'Datos de entrada inválidos',
          errors: error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      
      return res.status(500).json({ 
        status: 'error',
        message: 'Error interno del servidor' 
      });
    }
  };