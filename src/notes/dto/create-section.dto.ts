import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateSectionDto {
  @Length(1, 128)
  @IsNotEmpty()
  heading: string = '';

  @Length(1, 128)
  @IsOptional()
  subHeading: string | null = null;

  @Length(0, 512)
  @IsOptional()
  description: string | null = null;

  @Length(1, 10)
  @IsOptional()
  sectionColour: string = COLOUR_WHITE;

  declare notebookId: number;
}
