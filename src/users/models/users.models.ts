import {
  Column,
  Default,
  HasMany,
  Length,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { getDefaultTableConfig } from 'src/common/configs/entities.conf';
import { USER_ROLES } from 'src/common/constants/users.constants';
import { NoteBooks } from 'src/notes/models/notebooks.models';
import { Tags } from 'src/tags/models/tags.models';

@Table({ ...getDefaultTableConfig('users') })
export class Users extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  firstName!: string;

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

  @HasMany(() => Tags)
  tags: Tags[] = [];

  @HasMany(() => NoteBooks)
  notebooks: NoteBooks[] = [];
}
