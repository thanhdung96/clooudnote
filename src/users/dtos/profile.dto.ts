import { Expose } from 'class-transformer';

export class UserProfileDto {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  createdAt?: string;
}
