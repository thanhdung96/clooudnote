import {
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Length,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Sections } from './sections.models';

@Table({
  tableName: 'pages',
  timestamps: true,
  deletedAt: 'deletedAt',
  paranoid: true,
})
export class Pages extends Model {
  declare id: string;

  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  declare title: string;

  @Default(null)
  @Column({ allowNull: true })
  declare content?: string;

  @Column({ allowNull: false })
  declare notebookId: string;

  @ForeignKey(() => Sections)
  declare sectionId?: string;

  @Column({ allowNull: false })
  declare authorId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => Sections, 'sectionId')
  section!: Sections;
}
