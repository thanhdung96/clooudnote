import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { hashUserPassword, validatePassword } from 'src/common/utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_TYPE } from 'src/common/constants/security.conf';
import { JwtPayload } from '../dtos/jwt_payload.dto';
import { Users } from 'src/users/models/users.models';

@Injectable()
export class SecuritiesService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ email, password }: LoginDto): Promise<string | false> {
    const user = await this.userService.getActiveUserByEmail(email);
    if (user === null) {
      return false;
    }
    if (!(await this.checkPassword(password, user)) || !user.active) {
      return false;
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    return JWT_TOKEN_TYPE + ' ' + (await this.jwtService.signAsync(payload));
  }

  async checkPassword(password: string, user: Users): Promise<boolean> {
    return await validatePassword(password, user.password);
  }

  async changePassword(user: Users, newPassword: string): Promise<Users> {
    user.password = await hashUserPassword(newPassword);
    await user.save();

    return user;
  }
}
