import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { Expose } from 'class-transformer';

export class UpdateNotebookDto {
  id?: number;

  @Expose()
  @Length(1, 255)
  @IsNotEmpty()
  title: string = '';

  @Expose()
  @Length(1, 512)
  @IsOptional()
  abstract: string | null = null;

  @Expose()
  @Length(1, 10)
  @IsNotEmpty()
  coverColour: string = COLOUR_WHITE;
}
