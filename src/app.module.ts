import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { SecuritiesModule } from './securities/securities.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DATABASE_CONFIG } from './configs/database.conf';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    SecuritiesModule,
    TagsModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(DATABASE_CONFIG),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
