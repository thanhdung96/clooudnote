import { TableOptions } from 'sequelize-typescript';

export function getDefaultTableConfig(
  tableName: string,
  deletedAt: boolean = true,
): TableOptions {
  return {
    tableName,
    timestamps: true,
    deletedAt,
  };
}
