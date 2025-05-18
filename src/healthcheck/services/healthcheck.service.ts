import { Injectable } from '@nestjs/common';
import {
  DEFAULT_PASSWORD,
  USER_ROLES,
} from 'src/common/constants/users.constants';
import { RegistrationDto } from 'src/users/dtos/register.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class HealthcheckService {
  constructor(private userService: UsersService) {}

  async checkDBAccess(): Promise<void> {
    const adminUser = await this.userService.getAdmin();

    if (adminUser === null) {
      const newAdmin: RegistrationDto = this.createDefaultAdmin();
      this.userService.saveNewUser(newAdmin, USER_ROLES.ADMIN);
    }
  }

  private createDefaultAdmin(): RegistrationDto {
    const admin = new RegistrationDto();
    admin.firstName = 'admin';
    admin.lastName = 'clooudnote';
    admin.email = 'clooudnote_admin@email.com';
    admin.password = DEFAULT_PASSWORD;

    return admin;
  }
}
