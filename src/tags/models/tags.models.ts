import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { Users } from '@users/models/users.models';

@Table({
  tableName: 'tags',
  timestamps: true,
  deletedAt: false,
})
export class Tags extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  declare name: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  declare description: string;

  @Length({ max: 10, min: 1 })
  @Default(COLOUR_WHITE)
  @Column({ allowNull: false })
  declare colour: string;

  @BelongsTo(() => Users, 'userId')
  user!: Users;

  @ForeignKey(() => Users)
  declare userId: number;
}
