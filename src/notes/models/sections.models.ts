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
import { getDefaultTableConfig } from 'src/common/configs/entities.conf';
import { NoteBooks } from './notebooks.models';
import { Pages } from './pages.models';
import { COLOUR_WHITE } from 'src/common/constants/tags.constants';

@Table({ ...getDefaultTableConfig('sections', false) })
export class Sections extends Model {
  @Length({ max: 128, min: 1 })
  @Column({ allowNull: false })
  heading!: string;

  @Length({ max: 128, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  subHeading!: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  description!: string;

  @Length({ max: 10, min: 1 })
  @Default(COLOUR_WHITE)
  @Column({ allowNull: false })
  sectionColour: string = COLOUR_WHITE;

  @BelongsTo(() => NoteBooks, 'notebookId')
  notebook!: NoteBooks;

  @ForeignKey(() => NoteBooks)
  notebookId!: number;

  @HasMany(() => Pages)
  pages: Pages[] = [];
}
