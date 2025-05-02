import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { SecuritiesModule } from './securities/securities.module';

@Module({
  imports: [UsersModule, NotesModule, SecuritiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
