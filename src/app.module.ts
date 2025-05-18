import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { SecuritiesModule } from './securities/securities.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DATABASE_CONFIG } from './common/configs/database.conf';
import { TagsModule } from './tags/tags.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    SecuritiesModule,
    TagsModule,
    HealthcheckModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(DATABASE_CONFIG),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
