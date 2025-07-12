import { InjectModel } from '@nestjs/sequelize';
import { Sections } from '@notes/models/sections.models';
import { UpdateSectionDto } from '@notes/dto/update-section.dto';
import { CreateSectionDto } from '@notes/dto/create-section.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Sections)
    private sectionModel: typeof Sections,
  ) {}

  generateNewSection(): CreateSectionDto {
    const newSection = new CreateSectionDto();
    newSection.heading = 'Sample Section Heading';
    newSection.subHeading = 'Sample Section SubHeading';
    newSection.description = 'Put your description here';

    return newSection;
  }

  async getSectionsByNotebookId(notebookId: number): Promise<Sections[]> {
    return await this.sectionModel.findAll({ where: { notebookId } });
  }

  async getSectionById(
    notebookId: number,
    id: number,
  ): Promise<Sections | null> {
    return await this.sectionModel.findOne({ where: { notebookId, id } });
  }

  async updateSection(
    notebookId: number,
    id: number,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Sections> {
    const section = await this.getSectionById(notebookId, id);
    if (!section) {
      throw new Error('Section not found');
    }
    return await section.update(updateSectionDto);
  }

  async createSection(
    notebookId: number,
    createSectionDto: CreateSectionDto,
  ): Promise<UpdateSectionDto> {
    return await this.sectionModel.create({
      ...createSectionDto,
      notebookId: notebookId,
    });
  }

  async deleteSection(notebookId: number, id: number): Promise<void> {
    await this.sectionModel.destroy({ where: { notebookId, id } });
  }
}
