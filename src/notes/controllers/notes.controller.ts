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
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNotebookDto } from '../dto/create-notebook.dto';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { UpdateNotebookDto } from '../dto/update-notebook.dto';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { NoteBooks } from '@notes/models/notebooks.models';
import { ACTIONS } from '@common/constants/actions.constants';

@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private userService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post('notebooks')
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

    const { id, title, abstract, coverColour }: UpdateNotebookDto = notebook;
    return { id, title, abstract, coverColour };
  }

  @Get('notebooks')
  async getAllNotebooksAction(
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateNotebookDto[]> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;

    const lstNotebooks = await this.notesService.findAll(currentUser);

    return lstNotebooks.map((notebook: NoteBooks) => {
      const { id, title, abstract, coverColour }: UpdateNotebookDto = notebook;
      return { id, title, abstract, coverColour };
    });
  }

  @Get('notebooks/:id')
  async getNotebookByIdAction(
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
    if (ability.cannot(ACTIONS.READ, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    const { id, title, abstract, coverColour }: UpdateNotebookDto = notebook;
    return { id, title, abstract, coverColour };
  }

  @Patch('notebooks/:id')
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

    const { id, title, abstract, coverColour }: UpdateNotebookDto =
      updatedNotebook;
    return { id, title, abstract, coverColour };
  }

  @Delete('notebooks/:id')
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
}
