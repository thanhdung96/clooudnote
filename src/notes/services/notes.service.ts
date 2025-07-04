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

  async findById(id: number, user: Users): Promise<NoteBooks | null> {
    return await this.noteBooksModel.findOne({
      where: { id, userId: user.id },
    });
  }

  async update(
    id: number,
    updateNotebookDto: UpdateNotebookDto,
    user: Users,
  ): Promise<NoteBooks | null> {
    const notebook = await this.findById(id, user);
    if (notebook) {
      return await notebook.update(updateNotebookDto);
    }
    return null;
  }

  async remove(id: number, user: Users): Promise<void> {
    const notebook = await this.findById(id, user);
    if (notebook) {
      await notebook.destroy();
    }
  }
}
