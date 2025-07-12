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
  async findAllAction(
    @Param('notebooksId') notebooksId: number,
  ): Promise<UpdateSectionDto[]> {
    const sections =
      await this.sectionsService.getSectionsByNotebookId(notebooksId);
    return sections.map(
      ({ heading, subHeading, description, sectionColour }) => ({
        heading,
        subHeading,
        description,
        sectionColour,
      }),
    );
  }

  @Get(':id')
  async findOneAction(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
  ): Promise<UpdateSectionDto> {
    const section = await this.sectionsService.getSectionById(notebooksId, id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    const { heading, subHeading, description, sectionColour } = section;
    return { heading, subHeading, description, sectionColour };
  }

  @Post()
  async createAction(
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
  async updateAction(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<UpdateSectionDto> {
    const section = await this.sectionsService.updateSection(
      notebooksId,
      id,
      updateSectionDto,
    );
    const { heading, subHeading, description, sectionColour } = section;
    return { heading, subHeading, description, sectionColour };
  }

  @Delete(':id')
  async removeAction(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
  ): Promise<{ message: string; status: number }> {
    await this.sectionsService.deleteSection(notebooksId, id);
    return { status: 410, message: 'Section deleted' };
  }
}
