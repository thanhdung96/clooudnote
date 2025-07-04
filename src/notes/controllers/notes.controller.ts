import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNotebookDto } from '../dto/create-notebook.dto';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { Users } from '@users/models/users.models';
import { UpdateNotebookDto } from '../dto/update-notebook.dto';

@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private userService: UsersService,
  ) {}

  @Post('notebooks')
  async createNotebook(
    @Body() createNotebookDto: CreateNotebookDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    return await this.notesService.create(createNotebookDto, currentUser);
  }

  @Get('notebooks')
  async getNotebooks(@Req() req: AuthenticatedRequest) {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    return await this.notesService.findAll(currentUser);
  }

  @Get('notebooks/:id')
  async getNotebookById(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    return await this.notesService.findById(id, currentUser);
  }

  @Patch('notebooks/:id')
  async updateNotebook(
    @Param('id') id: number,
    @Body() updateNotebookDto: UpdateNotebookDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    return await this.notesService.update(id, updateNotebookDto, currentUser);
  }

  @Delete('notebooks/:id')
  async removeNotebook(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    return await this.notesService.remove(id, currentUser);
  }
}
