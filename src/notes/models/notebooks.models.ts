import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { getDefaultTableConfig } from 'src/configs/entities.conf';
import { Users } from 'src/users/models/users.models';
import { Sections } from './sections.models';
import { COLOUR_WHITE } from 'src/constants/tags.constants';

@Table({ ...getDefaultTableConfig('notebooks') })
export class NoteBooks extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  title!: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  abstract!: string;

  @Length({ max: 10, min: 1 })
  @Default(COLOUR_WHITE)
  @Column({ allowNull: false })
  coverColour: string = COLOUR_WHITE;

  @BelongsTo(() => Users, 'userId')
  user!: Users;

  @ForeignKey(() => Users)
  userId!: number;

  @HasMany(() => Sections)
  notebooks: Sections[] = [];
}
