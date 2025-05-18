import { IsEmail, Length, IsNotEmpty, Validate } from 'class-validator';
import { UniqueEmailConstraint } from 'src/common/decorators/UniqueEmail.decorator';

export class RegistrationDto {
  @Length(1, 255)
  @IsNotEmpty()
  firstName: string = '';

  @Length(1, 255)
  @IsNotEmpty()
  lastName: string = '';

  @IsEmail()
  @Length(1, 255)
  @IsNotEmpty()
  @Validate(UniqueEmailConstraint)
  email: string = '';

  @IsNotEmpty()
  password: string = '';
}
