import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './controllers/tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tags } from './models/tags.models';
import { UsersModule } from '@users/users.module';
import { TagsListener } from './services/tags.listener';
import { SecuritiesModule } from '@securities/securities.module';

@Module({
  providers: [TagsService, TagsListener],
  controllers: [TagsController],
  exports: [TagsService],
  imports: [UsersModule, SecuritiesModule, SequelizeModule.forFeature([Tags])],
})
export class TagsModule {}
