import { Module } from '@nestjs/common';
import { SecuritiesService } from './services/securities.service';

@Module({
  providers: [SecuritiesService],
})
export class SecuritiesModule {}
