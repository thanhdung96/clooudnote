import { InjectModel } from '@nestjs/sequelize';
import { Sections } from '@notes/models/sections.models';
import { UpdateSectionDto } from '@notes/dto/update-section.dto';
import { NoteBooks } from '@notes/models/notebooks.models';
import { CreateSectionDto } from '@notes/dto/create-section.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Sections)
    private sectionModel: typeof Sections,
  ) {}

  async createSection(
    newSection: CreateSectionDto,
    { id }: NoteBooks,
  ): Promise<UpdateSectionDto> {
    return await this.sectionModel.create({ ...newSection, notebookId: id });
  }

  generateNewSection(): CreateSectionDto {
    const newSection = new CreateSectionDto();
    newSection.heading = 'Sample Section Heading';
    newSection.subHeading = 'Sample Section SubHeading';
    newSection.description = 'Put your description here';

    return newSection;
  }
}
