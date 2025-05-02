import { Module } from '@nestjs/common';
import { SecuritiesService } from './securities.service';

@Module({
  providers: [SecuritiesService]
})
export class SecuritiesModule {}
