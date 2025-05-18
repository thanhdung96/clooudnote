import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { RegistrationDto } from '../dtos/register.dto';
import { GenericController } from 'src/common/controllers/generic.controller';
import { GenericApiResponse } from 'src/common/dtos/common.dto';

@Controller('users')
export class UsersController extends GenericController {
  constructor(private userService: UsersService) {
    super();
  }

  @Post('register')
  async registrationAction(
    @Body() registrationDto: RegistrationDto,
  ): Promise<GenericApiResponse> {
    await this.userService.register(registrationDto);
    return this.genericResponse(HttpStatus.CREATED);
  }
}
