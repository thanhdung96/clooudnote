import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { COLOUR_WHITE } from '@common/constants/tags.constants';

export class UpdateNotebookDto {
  id?: number;

  @Length(1, 255)
  @IsNotEmpty()
  title: string = '';

  @Length(1, 512)
  @IsOptional()
  abstract: string | null = null;

  @Length(1, 10)
  @IsNotEmpty()
  coverColour: string = COLOUR_WHITE;
}
