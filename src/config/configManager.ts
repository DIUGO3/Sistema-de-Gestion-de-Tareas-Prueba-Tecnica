import dotenv from 'dotenv';

// Cargamos las variables del archivo .env
dotenv.config();

export class ConfigManager {
  private static instance: ConfigManager;

  // Propiedades de configuración con tipos estrictos
  public readonly port: number;
  public readonly jwtSecret: string;
  public readonly databaseUrl: string;
  public readonly nodeEnv: string;
  public readonly jwtExpiresIn: string;

  private constructor() {
    // Asignamos valores con fallbacks por seguridad
    this.port = Number(process.env.PORT) || 3000;
    this.jwtSecret = process.env.JWT_SECRET || 'secret_fallback_key';
    this.databaseUrl = process.env.DATABASE_URL || '';
    this.nodeEnv = process.env.NODE_ENV || 'development';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

    // Validación crítica: Si no hay base de datos, lanzamos un error temprano
    if (!this.databaseUrl) {
      throw new Error("⚠️ ERROR: DATABASE_URL no está definida en el archivo .env");
    }
  }

  // Método Singleton para obtener la instancia única
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}