import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @IsNotEmpty()
  @MaxLength(255)
  password!: string;

  @IsNotEmpty()
  @MaxLength(255)
  newPassword!: string;
}
