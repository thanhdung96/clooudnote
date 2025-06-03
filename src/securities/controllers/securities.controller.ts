import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { SecuritiesService } from '../services/securities.service';
import { LoginDto } from '../dtos/login.dto';
import { GenericController } from 'src/common/controllers/generic.controller';
import { GenericApiResponse } from 'src/common/dtos/common.dto';
import { PublicRoute } from 'src/common/decorators/PublicRoute.decorator';
import { ChangePasswordDto } from '../dtos/change_pw.dto';
import { AuthenticatedRequest } from 'src/common/dtos/authenticated_request';
import { Users } from 'src/users/models/users.models';
import { UsersService } from 'src/users/services/users.service';

@Controller('securities')
export class SecuritiesController extends GenericController {
  constructor(
    private securityService: SecuritiesService,
    private userService: UsersService,
  ) {
    super();
  }

  @Post('/password/change')
  async changePasswordAction(
    @Body() { email, password, newPassword }: ChangePasswordDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<GenericApiResponse> {
    const currentUser: Users = (await this.userService.getActiveUserByEmail(
      req.user.email,
    )) as Users;

    if (currentUser.email !== email) {
      return this.responseBadRequest('incorrect credential');
    }

    const authenResult = await this.securityService.checkPassword(
      password,
      currentUser,
    );
    if (!authenResult) {
      return this.responseBadRequest('incorrect credential');
    }

    await this.securityService.changePassword(currentUser, newPassword);
    return this.genericResponse(HttpStatus.OK);
  }

  @Post('/login')
  @PublicRoute()
  async loginAction(@Body() loginDto: LoginDto): Promise<GenericApiResponse> {
    const authenResult = await this.securityService.authenticate(loginDto);

    if (authenResult === false) {
      return this.genericResponse(HttpStatus.UNAUTHORIZED, 'user not found');
    }

    const authToken = await this.securityService.authenticate(loginDto);
    return this.genericResponse(HttpStatus.OK, authToken as string);
  }
}
