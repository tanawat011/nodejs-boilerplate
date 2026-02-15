interface AppConfig {
  port: number;
  env: string;
  version: string;
}

interface DbConfig {
  url: string;
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

interface CorsConfig {
  origin: string;
}

export interface Config {
  app: AppConfig;
  db: DbConfig;
  jwt: JwtConfig;
  cors: CorsConfig;
}

const config: Config = {
  app: {
    port: Number(process.env.PORT) || 3000,
    env: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || '1.0.0',
  },
  db: {
    url: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/nodejs_boilerplate',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};

export default config;
