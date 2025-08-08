import { IsOptional, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdatePageDto {
  @Expose()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  heading?: string;

  @Expose()
  @IsOptional()
  @IsString()
  content?: string;
}
