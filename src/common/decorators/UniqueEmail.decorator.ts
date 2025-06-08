import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '@users/services/users.service';

@ValidatorConstraint({ async: true, name: 'uniqueEmail' })
@Injectable()
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}

  async validate(
    email: any,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const userWithEmail = await this.userService.getUserByEmail(email);

    return userWithEmail === null;
  }

  defaultMessage(
    validationArguments?: ValidationArguments | undefined,
  ): string {
    return 'email already exists';
  }
}
