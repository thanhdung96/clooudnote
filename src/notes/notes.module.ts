import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersModule } from '@users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NoteBooks } from './models/notebooks.models';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [UsersModule, SequelizeModule.forFeature([NoteBooks])],
})
export class NotesModule {}
