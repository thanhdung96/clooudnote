import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { getDefaultTableConfig } from 'src/common/configs/entities.conf';
import { Sections } from './sections.models';

@Table({ ...getDefaultTableConfig('pages', false) })
export class Pages extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  heading!: string;

  @Default(null)
  @Column({ allowNull: true })
  content!: string;

  @BelongsTo(() => Sections, 'sectionId')
  section!: Sections;

  @ForeignKey(() => Sections)
  sectionId!: number;
}
