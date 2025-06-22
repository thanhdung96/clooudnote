import { COLOUR_WHITE } from '@common/constants/tags.constants';
import { Length, IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  id?: number;
  
  @Length(1, 255)
  @IsNotEmpty()
  name: string = '';

  @Length(0, 512)
  description: string | null = null;

  @Length(1, 10)
  @IsNotEmpty()
  colour: string = COLOUR_WHITE;
}
