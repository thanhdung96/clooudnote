import { IsEmail, Length, IsNotEmpty, Validate } from 'class-validator';
import { UniqueEmailConstraint } from 'src/common/decorators/UniqueEmail.decorator';
import { Expose } from 'class-transformer';

export class RegistrationDto {
  @Expose()
  @Length(1, 255)
  @IsNotEmpty()
  firstName: string = '';

  @Expose()
  @Length(1, 255)
  @IsNotEmpty()
  lastName: string = '';

  @Expose()
  @IsEmail()
  @Length(1, 255)
  @IsNotEmpty()
  @Validate(UniqueEmailConstraint)
  email: string = '';

  @Expose()
  @IsNotEmpty()
  password: string = '';
}
