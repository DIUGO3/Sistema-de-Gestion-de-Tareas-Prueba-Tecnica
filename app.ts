import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from '../Sistema de Gestion de Tareas-Prueba Tecnica/src/api/routes/auth.routes';
import taskRoutes from '../Sistema de Gestion de Tareas-Prueba Tecnica/src/api/routes/task.routes';
import { errorHandler } from '../Sistema de Gestion de Tareas-Prueba Tecnica/src/api/error.middleware';
import { setupSwagger } from '../Sistema de Gestion de Tareas-Prueba Tecnica/src/config/swagger';
import { ConfigManager } from '../Sistema de Gestion de Tareas-Prueba Tecnica/src/config/configManager';

const config = ConfigManager.getInstance();
console.log(config.port); // Imprime 3000 o lo que tengas en el .env

const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://tudominio.com' : '*',
  credentials: true,
};

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger documentation
setupSwagger(app);

// Error handling
app.use(errorHandler);

export default app;