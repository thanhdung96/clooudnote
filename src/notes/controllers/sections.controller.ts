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
import { Sections } from '@notes/models/sections.models';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { ACTIONS } from '@common/constants/actions.constants';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';

@Controller('notebooks/:notebooksId/sections')
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly caslAbility: CaslAbilityFactory,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAllAction(
    @Param('notebooksId') notebooksId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateSectionDto[]> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createSectionAbilityForUser(currentUser);

    const sections =
      await this.sectionsService.getSectionsByNotebookId(notebooksId);

    // Vérification d'autorisation uniquement sur la première section
    if (sections.length > 0 && ability.cannot(ACTIONS.READ, sections[0])) {
      throw new UnauthorizedException(
        'You are not authorized to access these sections',
      );
    }

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
    const ability = this.caslAbility.createSectionAbilityForUser(currentUser);

    const section = await this.sectionsService.getSectionById(notebooksId, id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    if (ability.cannot(ACTIONS.READ, section)) {
      throw new UnauthorizedException(
        'You are not authorized to access this section',
      );
    }
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
    const ability = this.caslAbility.createSectionAbilityForUser(currentUser);

    // Pour la création, on vérifie l'autorisation sur l'objet cible (notebook ou section)
    if (ability.cannot(ACTIONS.UPDATE, Sections)) {
      throw new UnauthorizedException(
        'You are not authorized to create a section',
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
    const ability = this.caslAbility.createSectionAbilityForUser(currentUser);

    const section = await this.sectionsService.getSectionById(notebooksId, id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, section)) {
      throw new UnauthorizedException(
        'You are not authorized to update this section',
      );
    }

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
    const ability = this.caslAbility.createSectionAbilityForUser(currentUser);

    const section = await this.sectionsService.getSectionById(notebooksId, id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, section)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this section',
      );
    }

    await this.sectionsService.deleteSection(notebooksId, id);
    return { status: 410, message: 'Section deleted' };
  }
}
