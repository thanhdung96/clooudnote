import { InjectModel } from '@nestjs/sequelize';
import { Sections } from '@notes/models/sections.models';
import { NotesService } from './notes.service';
import { UpdateSectionDto } from '@notes/dto/update-section.dto';
import { NoteBooks } from '@notes/models/notebooks.models';
import { CreateSectionDto } from '@notes/dto/create-section.dto';

export class SectionsService {
  constructor(
    @InjectModel(Sections)
    private sectionModel: typeof Sections,
    private notesService: NotesService,
  ) {}

  async createSection(
    newSection: CreateSectionDto,
    { id }: NoteBooks,
  ): Promise<UpdateSectionDto> {
    return await this.sectionModel.create({ ...newSection, notebookId: id });
  }
}
