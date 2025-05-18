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
import { NoteBooks } from 'src/notes/models/notebooks.models';
import { Tags } from 'src/tags/models/tags.models';

@Table({ ...getDefaultTableConfig('users') })
export class Users extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  declare firstName: string;

  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  declare lastName: string;

  @Length({ max: 255, min: 1 })
  @Unique
  @Column({ allowNull: false, unique: true })
  declare email: string;

  @Length({ max: 128 })
  @Column
  declare password: string;

  @Default(false)
  @Column
  declare active: boolean;

  @Length({ max: 10 })
  @Column({ allowNull: false })
  declare role: string;

  @HasMany(() => Tags)
  declare tags: Tags[];

  @HasMany(() => NoteBooks)
  declare notebooks: NoteBooks[];
}
