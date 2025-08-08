import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateSectionDto {
  @Expose()
  @Length(1, 128)
  @IsNotEmpty()
  heading: string = '';

  @Expose()
  @Length(1, 128)
  @IsOptional()
  subHeading: string | null = null;

  @Expose()
  @Length(0, 512)
  @IsOptional()
  description: string | null = null;

  @Expose()
  @Length(1, 10)
  @IsOptional()
  sectionColour: string = COLOUR_WHITE;

  declare notebookId: number;
}
