import { Dialect } from 'sequelize';
import { Users } from 'src/users/models/users.model';

export const DATABASE_CONFIG = {
  dialect: 'mysql' as Dialect,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '3306'),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  database: process.env.DATABASE_NAME ?? 'test',
  models: [Users],
};
