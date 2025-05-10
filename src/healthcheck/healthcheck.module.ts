import { Module } from '@nestjs/common';
import { HealthcheckController } from './controllers/healthcheck.controller';
import { UsersModule } from 'src/users/users.module';
import { HealthcheckService } from './services/healthcheck.service';

@Module({
  controllers: [HealthcheckController],
  imports: [UsersModule],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
