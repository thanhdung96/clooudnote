import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { UniqueEmailConstraint } from '@common/decorators/UniqueEmail.decorator';
import { Expose } from 'class-transformer';

export class UpdateProfileDto {
  @Expose()
  @IsString()
  @Length(1, 255, {
    message: 'First name must be between 1 and 255 characters',
  })
  firstName!: string;

  @Expose()
  @IsString()
  @Length(1, 255, { message: 'Last name must be between 1 and 255 characters' })
  lastName!: string;

  @Expose()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
  @Validate(UniqueEmailConstraint)
  email!: string;
}
