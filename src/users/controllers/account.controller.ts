import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { GenericController } from 'src/common/controllers/generic.controller';
import { UserProfileDto } from '../dtos/profile.dto';
import { AuthenticatedRequest } from 'src/common/dtos/authenticated_request';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users.models';

@Controller('account')
export class AccountController extends GenericController {
  constructor(private userService: UsersService) {
    super();
  }

  @Get('/profile')
  async profileAction(
    @Req() req: AuthenticatedRequest,
  ): Promise<UserProfileDto> {
    const user = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const { firstName, lastName, email, createdAt }: UserProfileDto = user;
    const profile: UserProfileDto = { firstName, lastName, email, createdAt };

    return profile;
  }
}
