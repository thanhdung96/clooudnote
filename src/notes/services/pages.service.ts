import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pages } from '@notes/models/pages.models';
import { CreatePageDto } from '@notes/dto/create-page.dto';
import { UpdatePageDto } from '@notes/dto/update-page.dto';
import { NotesService } from './notes.service';
import { SectionsService } from './sections.service';
import { NotebookService } from './notebooks.service';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Pages)
    private pageModel: typeof Pages,
    private readonly notesService: NotesService,
    private readonly sectionsService: SectionsService,
    private readonly notebooksService: NotebookService,
  ) {}

  async getPagesBySectionId(sectionId: number): Promise<Pages[]> {
    return await this.pageModel.findAll({ where: { sectionId } });
  }

  async getPageById(sectionId: number, id: number): Promise<Pages | null> {
    return await this.pageModel.findOne({ where: { sectionId, id } });
  }

  async createPage(
    sectionId: number,
    createPageDto: CreatePageDto,
  ): Promise<Pages> {
    return await this.pageModel.create({
      ...createPageDto,
      sectionId: sectionId,
    });
  }

  async updatePage(
    sectionId: number,
    id: number,
    updatePageDto: UpdatePageDto,
  ): Promise<Pages> {
    const page = await this.getPageById(sectionId, id);
    if (!page) {
      throw new Error('Page not found');
    }
    return await page.update(updatePageDto);
  }

  async deletePage(sectionId: number, id: number): Promise<void> {
    await this.pageModel.destroy({ where: { sectionId, id } });
  }

  async findPagesByNotebook(notebookId: string): Promise<Pages[]> {
    return await this.pageModel.findAll({ where: { notebookId } });
  }

  async findPagesByNotebookAndSection(
    notebookId: string,
    sectionId: string,
  ): Promise<Pages[]> {
    return await this.pageModel.findAll({ where: { notebookId, sectionId } });
  }
}
