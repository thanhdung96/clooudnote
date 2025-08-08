import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteBooks } from '../models/notebooks.models';

@Injectable()
export class NotebookService {
  constructor(
    @InjectModel(NoteBooks)
    private readonly notebookModel: typeof NoteBooks,
  ) {}

  async findNotebookById(notebookId: number): Promise<NoteBooks | null> {
    return await this.notebookModel.findByPk(notebookId);
  }
}
