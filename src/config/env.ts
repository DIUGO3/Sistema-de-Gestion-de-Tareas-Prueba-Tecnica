// configuracion del entorno de la aplicacion, utilizando dotenv y zod para validar las variables de entorno
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

class Config {
  private static instance: Config;
  public readonly values: z.infer<typeof envSchema>;

  private constructor() {
    this.values = envSchema.parse(process.env);
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export const config = Config.getInstance().values;

