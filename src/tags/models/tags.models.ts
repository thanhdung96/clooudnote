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
import { COLOUR_WHITE } from 'src/common/constants/tags.constants';
import { Users } from 'src/users/models/users.models';

@Table({ ...getDefaultTableConfig('tags', false) })
export class Tags extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  name!: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  description!: string;

  @Length({ max: 10, min: 1 })
  @Default(COLOUR_WHITE)
  @Column({ allowNull: false })
  colour: string = COLOUR_WHITE;

  @Default(false)
  @Column({ allowNull: false })
  isDefault: boolean = false;

  @BelongsTo(() => Users, 'userId')
  user!: Users;

  @ForeignKey(() => Users)
  userId!: number;
}
