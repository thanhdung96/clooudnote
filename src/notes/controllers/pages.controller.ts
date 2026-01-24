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
import { PagesService } from '@notes/services/pages.service';
import { NotebookService } from '../services/notebooks.service';
import { NotebookAuthGuard } from '@securities/guards/notebook-auth.guard';
import { NotebookPolicy } from '@securities/decorators/notebook_policy.decorator';
import { CreatePageDto } from '@notes/dto/create-page.dto';
import { UpdatePageDto } from '@notes/dto/update-page.dto';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { ACTIONS } from '@common/constants/actions.constants';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { plainToInstance } from 'class-transformer';

@UseGuards(NotebookAuthGuard)
@Controller('notebooks/:notebooksId/sections/:sectionId/pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly caslAbility: CaslAbilityFactory,
    private readonly usersService: UsersService,
    private readonly notebooksService: NotebookService,
  ) {}

  @Get()
  @NotebookPolicy(ACTIONS.READ)
  async findAllAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto[]> {
    const pages = await this.pagesService.findPagesByNotebookAndSection(
      notebooksId,
      sectionId,
    );
    return plainToInstance(UpdatePageDto, pages, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @NotebookPolicy(ACTIONS.READ)
  async findOneAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto> {
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
  @NotebookPolicy(ACTIONS.UPDATE)
  async createAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Body() createPageDto: CreatePageDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto> {
    const page = await this.pagesService.createPage(
      Number(sectionId),
      createPageDto,
    );
    return plainToInstance(UpdatePageDto, page, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @NotebookPolicy(ACTIONS.UPDATE)
  async updateAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdatePageDto> {
    // Verify the page exists within the specified notebook/section
    const currentPages = await this.pagesService.findPagesByNotebookAndSection(
      notebooksId,
      sectionId,
    );
    const existingPage = currentPages.find((p) => p.id === id);
    if (!existingPage) {
      throw new NotFoundException('Page not found');
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
  @NotebookPolicy(ACTIONS.UPDATE)
  async removeAction(
    @Param('notebooksId') notebooksId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string; status: number }> {
    // Verify the page exists before attempting to delete
    const currentPages = await this.pagesService.findPagesByNotebookAndSection(
      notebooksId,
      sectionId,
    );
    const existingPage = currentPages.find((p) => p.id === id);
    if (!existingPage) {
      throw new NotFoundException('Page not found');
    }
    await this.pagesService.deletePage(Number(sectionId), Number(id));
    return { status: 410, message: 'Page deleted' };
  }
}
