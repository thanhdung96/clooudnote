import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@users/models/users.models';
import { InjectModel } from '@nestjs/sequelize';
import { USER_ROLES, USER_STATUS } from '@common/constants/users.constants';
import { RegistrationDto } from '@users/dtos/register.dto';
import { hashUserPassword } from '@common/utils/hashing';
import { UpdateProfileDto } from '@users/dtos/update-profile.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  USER_CREATED_EVENT,
  UserCreatedEvent,
} from '@common/events/users/user-created.event';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private eventEmitter: EventEmitter2,
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
    const createdUser: Users = await this.userModel.create({
      ...registrationDto,
      role,
      password: newPassword,
    });
    this.eventEmitter.emit(
      USER_CREATED_EVENT,
      new UserCreatedEvent(registrationDto.email),
    );

    return createdUser;
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

  async getActiveUserByEmail(email: string): Promise<Users | null> {
    return await this.userModel.findOne({
      where: {
        email,
        active: USER_STATUS.active,
      },
    });
  }

  async updateUserProfile(
    currentEmail: string,
    updateData: UpdateProfileDto,
  ): Promise<Users> {
    const user = await this.userModel.findOne({
      where: { email: currentEmail },
    });

    if (!user) {
      throw new NotFoundException('User profile not found');
    }

    // Extract update fields
    const { firstName, lastName, email } = updateData;

    // Validate new email if it's being changed
    if (email && email !== currentEmail) {
      const emailExists = await this.userModel.findOne({
        where: { email },
      });

      if (emailExists) {
        throw new ConflictException('Email address is already in use');
      }
    }
    await user.update({ firstName, lastName, email });

    try {
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user profile');
    }
  }
}
