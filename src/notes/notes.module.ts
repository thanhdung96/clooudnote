import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersModule } from '@users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NoteBooks } from './models/notebooks.models';
import { SecuritiesModule } from '@securities/securities.module';
import { SectionsService } from './services/sections.service';
import { Sections } from './models/sections.models';

@Module({
  providers: [NotesService, SectionsService],
  controllers: [NotesController],
  imports: [
    UsersModule,
    SecuritiesModule,
    SequelizeModule.forFeature([NoteBooks, Sections]),
  ],
})
export class NotesModule {}
