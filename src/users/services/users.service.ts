import { Injectable } from '@nestjs/common';
import { Users } from '../models/users.models';
import { InjectModel } from '@nestjs/sequelize';
import { USER_ROLES } from 'src/constants/users.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async saveNewUser(newUser: Users): Promise<Users | null> {
    if (newUser.role === USER_ROLES.ADMIN) {
      const adminUser = await this.getAdmin();

      if (adminUser) return null;
    }

    const userWithEmail = await this.getUserByEmail(newUser.email);
    if (userWithEmail) return null;

    await this.userModel.create({ ...newUser });
    return newUser;
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
