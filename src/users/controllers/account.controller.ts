import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  NotFoundException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { GenericController } from 'src/common/controllers/generic.controller';
import { UserProfileDto } from '../dtos/profile.dto';
import { AuthenticatedRequest } from 'src/common/dtos/authenticated_request';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users.models';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { GenericApiResponse } from 'src/common/dtos/common.dto';

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

  @Patch('/profile')
  async updateProfileAction(
    @Req() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<GenericApiResponse> {
    try {
      const updatedUser = await this.userService.updateUserProfile(
        req.user.email,
        updateProfileDto,
      );

      return this.genericResponse(
        HttpStatus.OK,
        'Profile updated successfully',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return this.genericResponse(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof ConflictException) {
        return this.genericResponse(HttpStatus.CONFLICT, error.message);
      }

      return this.genericResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'An error occurred updating the profile',
      );
    }
  }
}
