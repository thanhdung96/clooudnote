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
import { Users } from '@users/models/users.models';
import { Sections } from './sections.models';
import { COLOUR_WHITE } from '@common/constants/tags.constants';

@Table({
  tableName: 'notebooks',
  timestamps: true,
  deletedAt: 'deletedAt',
  paranoid: true,
})
export class NoteBooks extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  declare title: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  declare abstract: string;

  @Length({ max: 10, min: 1 })
  @Default(COLOUR_WHITE)
  @Column({ allowNull: false })
  declare coverColour: string;

  @BelongsTo(() => Users, 'userId')
  user!: Users;

  @ForeignKey(() => Users)
  declare userId: number;

  @HasMany(() => Sections)
  sections: Sections[] = [];
}
