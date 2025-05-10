import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './controllers/tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tags } from './models/tags.models';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
  imports: [SequelizeModule.forFeature([Tags])],
})
export class TagsModule {}
