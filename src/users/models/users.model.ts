import {
  Column,
  Default,
  HasMany,
  Length,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { COMMON_ENTITIES_DEF } from 'src/configs/entities.conf';
import { NoteBooks } from 'src/notes/models/notebooks.models';
import { Tags } from 'src/tags/models/tags.models';

@Table(COMMON_ENTITIES_DEF)
export class Users extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  fisrtName!: string;

  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  lastName!: string;

  @Length({ max: 255, min: 1 })
  @Unique
  @Column({ allowNull: false, unique: true })
  email!: string;

  @Length({ max: 128 })
  @Column
  password!: string;

  @Default(false)
  @Column
  active: boolean = false;

  @Length({ max: 10 })
  @Column({ allowNull: false })
  role: string = USER_ROLES.USER;

  @HasMany(() => Tags, 'id')
  tags: Tags[] = [];

  @HasMany(() => NoteBooks, 'id')
  notebooks: NoteBooks[] = [];
}

export enum USER_ROLES {
  USER = 'user',
  ADMIN = 'admin',
}
