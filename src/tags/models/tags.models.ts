import {
  BelongsTo,
  Column,
  Default,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { COMMON_ENTITIES_DEF } from 'src/configs/entities.conf';
import { Users } from 'src/users/models/users.model';

export const DEEFAULT_TAG_COLOUR = '#fff';

@Table({ ...COMMON_ENTITIES_DEF, deletedAt: false })
export class Tags extends Model {
  @Length({ max: 255, min: 1 })
  @Column({ allowNull: false })
  name!: string;

  @Length({ max: 512, min: 1 })
  @Default(null)
  @Column({ allowNull: true })
  description!: string;

  @Length({ max: 10, min: 1 })
  @Default(DEEFAULT_TAG_COLOUR)
  @Column({ allowNull: false })
  colour: string = DEEFAULT_TAG_COLOUR;

  @BelongsTo(() => Users, 'id')
  user!: Users;
}
