import { Injectable } from '@nestjs/common';
import { Users } from '../models/users.models';
import { InjectModel } from '@nestjs/sequelize';
import { USER_ROLES } from 'src/common/constants/users.constants';
import { HashingService } from 'src/securities/services/hashing.service';
import { RegistrationDto } from '../dtos/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private hashingService: HashingService,
  ) {}

  async register(registrationDto: RegistrationDto): Promise<Users | null> {
    const newUser = new Users();
    newUser.firstName = registrationDto.firstName;
    newUser.lastName = registrationDto.lastName;
    newUser.email = registrationDto.email;
    newUser.password = registrationDto.password;

    return await this.saveNewUser(newUser);
  }

  async saveNewUser(newUser: Users): Promise<Users | null> {
    if (newUser.role === USER_ROLES.ADMIN) {
      const adminUser = await this.getAdmin();

      if (adminUser) return null;
    }

    newUser = await this.hashingService.hashUserPassword(newUser);
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
