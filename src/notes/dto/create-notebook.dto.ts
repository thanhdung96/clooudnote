import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotebookDto {
  @Length(1, 255)
  @IsNotEmpty()
  title: string = '';

  @Length(1, 512)
  @IsOptional()
  abstract: string | null = null;

  @Length(1, 10)
  @IsNotEmpty()
  coverColour: string = COLOUR_WHITE;

  declare userId: number;
}
