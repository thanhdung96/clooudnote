import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersModule } from '@users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NoteBooks } from './models/notebooks.models';
import { SecuritiesModule } from '@securities/securities.module';
import { SectionsService } from './services/sections.service';
import { Sections } from './models/sections.models';
import { SectionsController } from './controllers/sections.controller';
import { NotebookService } from './services/notebooks.service';
import { PagesService } from './services/pages.service';
import { Pages } from './models/pages.models';
import { PagesController } from './controllers/pages.controller';

@Module({
  providers: [NotesService, SectionsService, PagesService, NotebookService],
  controllers: [NotesController, SectionsController, PagesController],
  imports: [
    UsersModule,
    SecuritiesModule,
    SequelizeModule.forFeature([NoteBooks, Sections, Pages]),
  ],
})
export class NotesModule {}
