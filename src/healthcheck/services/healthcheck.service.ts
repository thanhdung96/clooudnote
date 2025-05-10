import { Injectable } from '@nestjs/common';
import { DEFAULT_PASSWORD, USER_ROLES } from 'src/constants/users.constants';
import { Users } from 'src/users/models/users.models';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class HealthcheckService {
  constructor(private userService: UsersService) {}

  async checkDBAccess(): Promise<void> {
    const adminUser = await this.userService.getAdmin();

    if (adminUser === null) {
      const newAdmin: Users = this.createDefaultAdmin();
      this.userService.saveNewUser(newAdmin);
    }
  }

  private createDefaultAdmin(): Users {
    const admin = new Users();
    admin.active = true;
    admin.fisrtName = 'admin';
    admin.lastName = 'clooudnote';
    admin.email = 'clooudnote_admin@email.com';
    admin.password = DEFAULT_PASSWORD;
    admin.role = USER_ROLES.ADMIN;

    return admin;
  }
}
