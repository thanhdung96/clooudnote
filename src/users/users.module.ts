import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/users.models';
import { UniqueEmailConstraint } from 'src/common/decorators/UniqueEmail.decorator';
import { AccountController } from './controllers/account.controller';

@Module({
  providers: [UsersService, UniqueEmailConstraint],
  exports: [UsersService],
  controllers: [UsersController, AccountController],
  imports: [SequelizeModule.forFeature([Users])],
})
export class UsersModule {}
