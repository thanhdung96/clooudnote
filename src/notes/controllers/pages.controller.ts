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
import { PagesService } from '@notes/services/pages.service';
import { NotebookService } from '../services/notebooks.service';
import { CreatePageDto } from '@notes/dto/create-page.dto';
import { UpdatePageDto } from '@notes/dto/update-page.dto';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { ACTIONS } from '@common/constants/actions.constants';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { plainToInstance } from 'class-transformer';

@Controller('notebooks/:notebooksId/sections/:sectionId/pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly caslAbility: CaslAbilityFactory,
    private readonly usersService: UsersService,
    private readonly notebooksService: NotebookService,
  ) {}

  @Get()
  async findAllAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto[]> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notebooksService.findNotebookById(
      Number(notebooksId),
    );
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.READ, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    const pages = await this.pagesService.findPagesByNotebookAndSection(
      notebooksId,
      sectionId,
    );

    return plainToInstance(UpdatePageDto, pages, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOneAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notebooksService.findNotebookById(
      Number(notebooksId),
    );
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.READ, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    const pages = await this.pagesService.findPagesByNotebookAndSection(
      notebooksId,
      sectionId,
    );
    const page = pages.find((p) => p.id === id);
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return plainToInstance(UpdatePageDto, page, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async createAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Body() createPageDto: CreatePageDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notebooksService.findNotebookById(
      Number(notebooksId),
    );
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to create a page in this notebook',
      );
    }

    const page = await this.pagesService.createPage(
      Number(sectionId),
      createPageDto,
    );

    return plainToInstance(UpdatePageDto, page, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async updateAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notebooksService.findNotebookById(
      Number(notebooksId),
    );
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to update this page',
      );
    }

    const updatedPage = await this.pagesService.updatePage(
      Number(sectionId),
      Number(id),
      updatePageDto,
    );

    return plainToInstance(UpdatePageDto, updatedPage, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async removeAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string; status: number }> {
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability = this.caslAbility.createNotebookAbilityForUser(currentUser);

    const notebook = await this.notebooksService.findNotebookById(
      Number(notebooksId),
    );
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this page',
      );
    }

    await this.pagesService.deletePage(Number(sectionId), Number(id));
    return { status: 410, message: 'Page deleted' };
  }
}
