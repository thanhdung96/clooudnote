import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { Length, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateTagDto {
  @Expose()
  @Length(1, 255)
  @IsNotEmpty()
  name: string = '';

  @Expose()
  @Length(0, 512)
  description: string | null = null;

  @Expose()
  @Length(1, 10)
  @IsNotEmpty()
  colour: string = COLOUR_WHITE;

  declare userId: number;
}
