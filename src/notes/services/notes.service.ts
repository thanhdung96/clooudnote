import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteBooks } from '@notes/models/notebooks.models';
import { CreateNotebookDto } from '@notes/dto/create-notebook.dto';
import { Users } from '@users/models/users.models';
import { UpdateNotebookDto } from '@notes/dto/update-notebook.dto';
import { SectionsService } from './sections.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteBooks)
    private noteBooksModel: typeof NoteBooks,
    private readonly sectionService: SectionsService,
  ) {}

  async create(
    createNotebookDto: CreateNotebookDto,
    user: Users,
  ): Promise<NoteBooks> {
    createNotebookDto.userId = user.id;
    const notebook: NoteBooks = await this.noteBooksModel.create({
      ...createNotebookDto,
    });

    const section = this.sectionService.generateNewSection();
    await this.sectionService.createSection(notebook.id, section);

    return notebook;
  }

  async findAll(
    user: Users,
    includeDeleted: boolean = false,
  ): Promise<NoteBooks[]> {
    return await this.noteBooksModel.findAll({
      where: { userId: user.id },
      paranoid: !includeDeleted,
    });
  }

  async findById(
    id: number,
    includeDeleted: boolean = false,
  ): Promise<NoteBooks | null> {
    return await this.noteBooksModel.findOne({
      where: { id },
      paranoid: !includeDeleted,
    });
  }

  async update(
    id: number,
    updateNotebookDto: UpdateNotebookDto,
  ): Promise<NoteBooks> {
    const notebook = await this.findById(id);
    if (notebook) {
      return await notebook.update(updateNotebookDto);
    }
    throw Error('Notebook not found');
  }

  async remove(id: number): Promise<void> {
    const notebook = await this.findById(id);
    if (notebook) {
      await notebook.destroy();
    }
  }

  async restore(id: number): Promise<NoteBooks> {
    const notebook = await this.findById(id, true);
    if (notebook) {
      if (notebook.deletedAt === null) {
        return notebook;
      }

      await notebook.restore();
    }
    throw Error('Notebook not found');
  }
}
