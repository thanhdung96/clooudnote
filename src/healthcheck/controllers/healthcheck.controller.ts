import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from '../services/healthcheck.service';
import { HealthCheckDto } from '../dtos/healthcheck.dto';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(private healthCheckService: HealthcheckService) {}

  @Get()
  async healthCheckAction(): Promise<HealthCheckDto> {
    await this.healthCheckService.checkDBAccess();

    return {
      success: true,
      message: 'success',
    };
  }
}
