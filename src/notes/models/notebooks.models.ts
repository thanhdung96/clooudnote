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
import { Users } from 'src/users/models/users.model';
import { Sections } from './sections.models';

@Table(COMMON_ENTITIES_DEF)
export class NoteBooks extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  title!: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  abstract!: string;

  @Length({ max: 10, min: 1 })
  @Default(DEEFAULT_TAG_COLOUR)
  @Column({ allowNull: false })
  coverColour: string = DEEFAULT_TAG_COLOUR;

  @BelongsTo(() => Users, 'id')
  user!: Users;

  @HasMany(() => Sections, 'id')
  notebooks: Sections[] = [];
}
