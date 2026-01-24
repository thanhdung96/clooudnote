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
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from '@notes/services/sections.service';
import { plainToInstance } from 'class-transformer';
import { CreateSectionDto } from '@notes/dto/create-section.dto';

import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { NotesService } from '@notes/services/notes.service';
import { NotebookAuthGuard } from '@securities/guards/notebook-auth.guard';
import { NotebookPolicy } from '@securities/decorators/notebook_policy.decorator';
import { ACTIONS } from '@common/constants/actions.constants';
import { UpdateSectionDto } from '@notes/dto/update-section.dto';
import { Sections } from '@notes/models/sections.models';

@UseGuards(NotebookAuthGuard)
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

    return plainToInstance(UpdateSectionDto, sections, {
      excludeExtraneousValues: true,
    });
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

    const section = (await this.sectionsService.getSectionById(
      notebooksId,
      id,
    )) as Sections;
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    return plainToInstance(UpdateSectionDto, section, {
      excludeExtraneousValues: true,
    });
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
    return plainToInstance(UpdateSectionDto, section, {
      excludeExtraneousValues: true,
    });
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
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const updatedSection = await this.sectionsService.updateSection(
      notebooksId,
      id,
      updateSectionDto,
    );
    return plainToInstance(UpdateSectionDto, updatedSection, {
      excludeExtraneousValues: true,
    });
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
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    await this.sectionsService.deleteSection(notebooksId, id);
    return { status: 410, message: 'Section deleted' };
  }
}
