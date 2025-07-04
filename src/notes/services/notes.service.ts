import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteBooks } from '../models/notebooks.models';
import { CreateNotebookDto } from '../dto/create-notebook.dto';
import { Users } from '@users/models/users.models';
import { UpdateNotebookDto } from '../dto/update-notebook.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteBooks)
    private noteBooksModel: typeof NoteBooks,
  ) {}

  async create(
    createNotebookDto: CreateNotebookDto,
    user: Users,
  ): Promise<NoteBooks> {
    createNotebookDto.userId = user.id;
    return await this.noteBooksModel.create({ ...createNotebookDto });
  }

  async findAll(user: Users): Promise<NoteBooks[]> {
    return await this.noteBooksModel.findAll({ where: { userId: user.id } });
  }

  async findById(id: number): Promise<NoteBooks | null> {
    return await this.noteBooksModel.findOne({
      where: { id },
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
}
