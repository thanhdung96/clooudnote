import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { validatePassword } from 'src/common/utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_TYPE } from 'src/common/constants/security.conf';
import { JwtPayload } from '../dtos/jwt_payload.dto';

@Injectable()
export class SecuritiesService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ email, password }: LoginDto): Promise<string | false> {
    const user = await this.userService.getUserByEmail(email);
    if (user === null) {
      return false;
    }
    if (!(await validatePassword(password, user.password)) || !user.active) {
      return false;
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    return JWT_TOKEN_TYPE + ' ' + (await this.jwtService.signAsync(payload));
  }
}
