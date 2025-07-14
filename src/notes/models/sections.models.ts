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
import { NoteBooks } from './notebooks.models';
import { Pages } from './pages.models';
import { COLOUR_WHITE } from '@common/constants/tags.constants';

@Table({
  tableName: 'sections',
  timestamps: true,
  deletedAt: 'deletedAt',
  paranoid: true,
})
export class Sections extends Model {
  @Length({ max: 128, min: 1 })
  @Column({ allowNull: false })
  declare heading: string;

  @Length({ max: 128, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  declare subHeading: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  declare description: string;

  @Length({ max: 10, min: 1 })
  @Default(COLOUR_WHITE)
  @Column({ allowNull: false })
  declare sectionColour: string;

  @BelongsTo(() => NoteBooks, 'notebookId')
  notebook!: NoteBooks;

  @ForeignKey(() => NoteBooks)
  declare notebookId: number;

  @HasMany(() => Pages)
  pages: Pages[] = [];
}
