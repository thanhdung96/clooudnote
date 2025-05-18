import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SecuritiesService } from '../services/securities.service';
import { LoginDto } from '../dtos/login.dto';
import { GenericController } from 'src/common/controllers/generic.controller';
import { GenericApiResponse } from 'src/common/dtos/common.dto';
import { PublicRoute } from 'src/common/decorators/PublicRoute.decorator';

@Controller('securities')
export class SecuritiesController extends GenericController {
  constructor(private securityService: SecuritiesService) {
    super();
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
