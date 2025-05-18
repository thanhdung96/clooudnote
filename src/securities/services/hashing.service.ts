import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ROUND_NUMBER } from 'src/common/constants/security.conf';
import { Users } from 'src/users/models/users.models';

@Injectable()
export class HashingService {
  async hashUserPassword(user: Users): Promise<Users> {
    const salt = await this.generateSalt();
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return user;
  }

  private async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(ROUND_NUMBER);
  }
}
