import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  uploadsDir: process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads'),
  database: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DATABASE_NAME || 'architector',
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password'
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || '2'),
      max: parseInt(process.env.DB_POOL_MAX || '10')
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations'
    },
    seeds: {
      directory: 'seeds'
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  }
};