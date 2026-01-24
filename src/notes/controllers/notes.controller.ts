import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { NotebookAuthGuard } from '@securities/guards/notebook-auth.guard';
import { NotebookPolicy } from '@securities/decorators/notebook_policy.decorator';
import { NotesService } from '@notes/services/notes.service';
import { plainToInstance } from 'class-transformer';
import { CreateNotebookDto } from '@notes/dto/create-notebook.dto';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { UpdateNotebookDto } from '@notes/dto/update-notebook.dto';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { NoteBooks } from '@notes/models/notebooks.models';
import { ACTIONS } from '@common/constants/actions.constants';

@UseGuards(NotebookAuthGuard)
@Controller('notebooks')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private userService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @NotebookPolicy(ACTIONS.UPDATE)
  @Post()
  async createNotebookAction(
    @Body() createNotebookDto: CreateNotebookDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateNotebookDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;

    const notebook = await this.notesService.create(
      createNotebookDto,
      currentUser,
    );

    return plainToInstance(UpdateNotebookDto, notebook, {
      excludeExtraneousValues: true,
    });
  }

  @NotebookPolicy(ACTIONS.READ)
  @Get()
  async getAllNotebooksAction(
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateNotebookDto[]> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;

    const lstNotebooks = await this.notesService.findAll(currentUser);

    return lstNotebooks.map((notebook: NoteBooks) => {
      return plainToInstance(UpdateNotebookDto, notebook, {
        excludeExtraneousValues: true,
      });
    });
  }

  @NotebookPolicy(ACTIONS.READ)
  @Get(':id')
  async getNotebookByIdAction(
    @Param('id') notebookId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateNotebookDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createNotebookAbilityForUser(currentUser);
    const notebook = await this.notesService.findById(notebookId, true);

    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.READ, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    return plainToInstance(UpdateNotebookDto, notebook, {
      excludeExtraneousValues: true,
    });
  }

  @NotebookPolicy(ACTIONS.UPDATE)
  @Patch(':id')
  async updateNotebookByIdAction(
    @Param('id') notebookId: number,
    @Body() updateNotebookDto: UpdateNotebookDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateNotebookDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createNotebookAbilityForUser(currentUser);
    const notebook = await this.notesService.findById(notebookId);

    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    const updatedNotebook = await this.notesService.update(
      notebookId,
      updateNotebookDto,
    );

    return plainToInstance(UpdateNotebookDto, updatedNotebook, {
      excludeExtraneousValues: true,
    });
  }

  @NotebookPolicy(ACTIONS.DELETE)
  @Delete(':id')
  async deleteNotebookByIdAction(
    @Param('id') notebookId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ status: number; message: string }> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createNotebookAbilityForUser(currentUser);
    const notebook = await this.notesService.findById(notebookId);

    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.DELETE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this notebook',
      );
    }
    await this.notesService.remove(notebookId);
    return { status: 410, message: 'Notebook deleted' };
  }

  @NotebookPolicy(ACTIONS.UPDATE)
  @Patch(':id/restore')
  async restoreDeletedNoteAction(
    @Param('id') notebookId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateNotebookDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createNotebookAbilityForUser(currentUser);
    const notebook = await this.notesService.findById(notebookId);

    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this notebook',
      );
    }

    return plainToInstance(
      UpdateNotebookDto,
      await this.notesService.restore(notebookId),
      { excludeExtraneousValues: true },
    );
  }
}
