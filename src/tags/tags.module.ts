import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './controllers/tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tags } from './models/tags.models';
import { UsersModule } from '@users/users.module';
import { TagsListener } from './services/tags.listener';

@Module({
  providers: [TagsService, TagsListener],
  controllers: [TagsController],
  exports: [TagsService],
  imports: [UsersModule, SequelizeModule.forFeature([Tags])],
})
export class TagsModule {}
