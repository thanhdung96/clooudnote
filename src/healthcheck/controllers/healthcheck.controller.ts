import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from '../services/healthcheck.service';
import { GenericApiResponse } from '../../common/dtos/common.dto';
import { GenericController } from 'src/common/controllers/generic.controller';
import { PublicRoute } from 'src/common/decorators/PublicRoute.decorator';

@Controller('healthcheck')
@PublicRoute()
export class HealthcheckController extends GenericController {
  constructor(private healthCheckService: HealthcheckService) {
    super();
  }

  @Get()
  async healthCheckAction(): Promise<GenericApiResponse> {
    await this.healthCheckService.checkDBAccess();

    return this.genericResponse();
  }
}
