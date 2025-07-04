import {
  Column,
  Default,
  HasMany,
  Length,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { NoteBooks } from '@notes/models/notebooks.models';
import { Tags } from '@tags/models/tags.models';

@Table({
  tableName: 'users',
  timestamps: true,
  deletedAt: 'deletedAt',
  paranoid: true,
})
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
