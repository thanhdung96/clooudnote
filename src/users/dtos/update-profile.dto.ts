import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { UniqueEmailConstraint } from '@common/decorators/UniqueEmail.decorator';

export class UpdateProfileDto {
  @IsString()
  @Length(1, 255, {
    message: 'First name must be between 1 and 255 characters',
  })
  firstName!: string;

  @IsString()
  @Length(1, 255, { message: 'Last name must be between 1 and 255 characters' })
  lastName!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
  @Validate(UniqueEmailConstraint)
  email!: string;
}
