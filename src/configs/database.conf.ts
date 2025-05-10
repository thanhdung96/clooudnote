import { Dialect } from 'sequelize';
import { NoteBooks } from 'src/notes/models/notebooks.models';
import { Pages } from 'src/notes/models/pages.models';
import { Sections } from 'src/notes/models/sections.models';
import { Tags } from 'src/tags/models/tags.models';
import { Users } from 'src/users/models/users.models';

export const DATABASE_CONFIG = {
  dialect: 'mysql' as Dialect,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '3306'),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  database: process.env.DATABASE_NAME ?? 'test',
  models: [Users, Tags, NoteBooks, Sections, Pages],
};
