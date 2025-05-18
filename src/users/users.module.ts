import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/users.models';
import { SecuritiesModule } from 'src/securities/securities.module';
import { UniqueEmailConstraint } from 'src/common/decorators/UniqueEmail.decorator';

@Module({
  providers: [UsersService, UniqueEmailConstraint],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([Users]), SecuritiesModule],
})
export class UsersModule {}
