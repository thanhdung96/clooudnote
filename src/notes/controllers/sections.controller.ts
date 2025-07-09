import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { SectionsService } from '@notes/services/sections.service';
import { CreateSectionDto } from '@notes/dto/create-section.dto';
import { UpdateSectionDto } from '@notes/dto/update-section.dto';

import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { ACTIONS } from '@common/constants/actions.constants';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { NotesService } from '@notes/services/notes.service';
import { Sections } from '@notes/models/sections.models';

@Controller('notebooks/:notebooksId/sections')
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly caslAbility: CaslAbilityFactory,
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
  ) {}

  @Get()
  async findAllAction(
    @Param('notebooksId') notebooksId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateSectionDto[]> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notesService.findById(notebooksId);
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.READ, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

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
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateSectionDto> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notesService.findById(notebooksId);
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.READ, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    const section = (await this.sectionsService.getSectionById(notebooksId, id)) as Sections;
    const { heading, subHeading, description, sectionColour } = section;
    return { heading, subHeading, description, sectionColour };
  }

  @Post()
  async createAction(
    @Param('notebooksId') notebooksId: number,
    @Body() createSectionDto: CreateSectionDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateSectionDto> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notesService.findById(notebooksId);
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to create a section in this notebook',
      );
    }

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
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateSectionDto> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notesService.findById(notebooksId);
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to update this section',
      );
    }

    const section = await this.sectionsService.getSectionById(notebooksId, id);

    const updatedSection = await this.sectionsService.updateSection(
      notebooksId,
      id,
      updateSectionDto,
    );
    const { heading, subHeading, description, sectionColour } = updatedSection;
    return { heading, subHeading, description, sectionColour };
  }

  @Delete(':id')
  async removeAction(
    @Param('notebooksId') notebooksId: number,
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string; status: number }> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notesService.findById(notebooksId);
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this section',
      );
    }

    const section = await this.sectionsService.getSectionById(notebooksId, id);

    await this.sectionsService.deleteSection(notebooksId, id);
    return { status: 410, message: 'Section deleted' };
  }
}
