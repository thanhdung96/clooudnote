import {
  BelongsTo,
  Column,
  Default,
  HasMany,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { COMMON_ENTITIES_DEF } from 'src/configs/entities.conf';
import { DEEFAULT_TAG_COLOUR } from 'src/tags/models/tags.models';
import { NoteBooks } from './notebooks.models';
import { Pages } from './pages.models';

@Table({ ...COMMON_ENTITIES_DEF, deletedAt: false })
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
  @Default(DEEFAULT_TAG_COLOUR)
  @Column({ allowNull: false })
  sectionColour: string = DEEFAULT_TAG_COLOUR;

  @BelongsTo(() => NoteBooks, 'id')
  user!: NoteBooks;

  @HasMany(() => Pages, 'id')
  notebooks: Pages[] = [];
}
