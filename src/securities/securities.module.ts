import { Module } from '@nestjs/common';
import { SecuritiesService } from './services/securities.service';
import { HashingService } from './services/hashing.service';

@Module({
  providers: [SecuritiesService, HashingService],
  exports: [HashingService],
})
export class SecuritiesModule {}
