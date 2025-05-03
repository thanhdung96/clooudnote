import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './controllers/tags.controller';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
