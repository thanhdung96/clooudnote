import {
  BelongsTo,
  Column,
  Default,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { COMMON_ENTITIES_DEF } from 'src/configs/entities.conf';
import { Sections } from './sections.models';

@Table({ ...COMMON_ENTITIES_DEF, deletedAt: false })
export class Pages extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  heading!: string;

  @Default(null)
  @Column({ allowNull: true })
  content!: string;

  @BelongsTo(() => Sections, 'id')
  user!: Sections;
}
