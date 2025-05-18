import { Injectable } from '@nestjs/common';
import { Users } from '../models/users.models';
import { InjectModel } from '@nestjs/sequelize';
import { USER_ROLES } from 'src/common/constants/users.constants';
import { RegistrationDto } from '../dtos/register.dto';
import { hashUserPassword } from 'src/common/utils/hashing';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async saveNewUser(
    registrationDto: RegistrationDto,
    role: string = USER_ROLES.USER,
  ): Promise<Users | null> {
    if (role === USER_ROLES.ADMIN) {
      const adminUser = await this.getAdmin();

      if (adminUser) return null;
    }

    const newPassword = await hashUserPassword(registrationDto.password);
    return await this.userModel.create({
      ...registrationDto,
      role,
      password: newPassword,
    });
  }

  async getAdmin(): Promise<Users | null> {
    return await this.userModel.findOne({
      where: {
        role: USER_ROLES.ADMIN,
      },
    });
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }
}
