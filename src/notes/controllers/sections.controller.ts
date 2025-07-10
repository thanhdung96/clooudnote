import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { SectionsService } from '../services/sections.service';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { Sections } from '../models/sections.models';

@Controller('notebooks/:notebooksId/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  async findAll(
    @Param('notebooksId') notebooksId: number,
  ): Promise<Sections[]> {
    return await this.sectionsService.getSectionsByNotebookId(notebooksId);
  }

  @Get(':id')
  async findOne(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
  ): Promise<Sections> {
    const section = await this.sectionsService.getSectionById(notebooksId, id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    return section;
  }

  @Post()
  async create(
    @Param('notebooksId') notebooksId: number,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<UpdateSectionDto> {
    const section = await this.sectionsService.createSection(
      notebooksId,
      createSectionDto,
    );
    const { heading, subHeading, description, sectionColour } = section;
    return { heading, subHeading, description, sectionColour };
  }

  @Patch(':id')
  async update(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<Sections> {
    const section = await this.sectionsService.updateSection(
      notebooksId,
      id,
      updateSectionDto,
    );
    return section;
  }

  @Delete(':id')
  async remove(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
  ): Promise<any> {
    await this.sectionsService.deleteSection(notebooksId, id);
    return { message: 'Section deleted successfully' };
  }
}
