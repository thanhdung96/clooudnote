import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { Sections } from './sections.models';

@Table({
  tableName: 'pages',
  timestamps: true,
  deletedAt: 'deletedAt',
  paranoid: true,
})
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
