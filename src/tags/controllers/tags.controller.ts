import { GenericController } from '@common/controllers/generic.controller';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import {
  Controller,
  Get,
  Req,
  Param,
  NotFoundException,
  UnauthorizedException,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UpdateTagDto } from '@tags/dtos/update-tag.dto';
import { CreateTagDto } from '@tags/dtos/create-tag.dto';
import { Tags } from '@tags/models/tags.models';
import { TagsService } from '@tags/services/tags.service';
import { plainToInstance } from 'class-transformer';
import { Users } from '@users/models/users.models';
import { UsersService } from '@users/services/users.service';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { ACTIONS } from '@common/constants/actions.constants';

@Controller('tags')
export class TagsController extends GenericController {
  constructor(
    private tagsService: TagsService,
    private userService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
    super();
  }

  @Get()
  async getAllTagsAction(
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateTagDto[]> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;

    const lstTags = await this.tagsService.getAll(currentUser);
    return lstTags.map((tag: Tags) => {
      return plainToInstance(UpdateTagDto, tag, {
        excludeExtraneousValues: true,
      });
    });
  }

  @Get(':id')
  async getTagByIdAction(
    @Param('id') tagId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateTagDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createTagsAbilityForUser(currentUser);

    const tag = await this.tagsService.getById(tagId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    if (ability.cannot(ACTIONS.READ, tag)) {
      throw new UnauthorizedException(
        'You are not authorized to access this tag',
      );
    }
    return plainToInstance(UpdateTagDto, tag, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async updateTagByIdAction(
    @Param('id') tagId: number,
    @Req() req: AuthenticatedRequest,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateTagDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createTagsAbilityForUser(currentUser);

    const tag = await this.tagsService.getById(tagId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    if (ability.cannot(ACTIONS.UPDATE, tag)) {
      throw new UnauthorizedException(
        'You are not authorized to update this tag',
      );
    }
    const updatedTag = await this.tagsService.updateById(tagId, updateTagDto);
    return plainToInstance(UpdateTagDto, updatedTag, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async createTagAction(
    @Req() req: AuthenticatedRequest,
    @Body() createTagDto: CreateTagDto,
  ): Promise<UpdateTagDto> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;

    const createdTag = await this.tagsService.create(createTagDto, currentUser);
    return plainToInstance(UpdateTagDto, createdTag, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async deleteTagByIdAction(
    @Param('id') tagId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ status: number; message: string }> {
    const currentUser = (await this.userService.getUserByEmail(
      req.user.email,
    )) as Users;
    const ability =
      this.caslAbilityFactory.createTagsAbilityForUser(currentUser);

    const tag = await this.tagsService.getById(tagId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    if (ability.cannot(ACTIONS.DELETE, tag)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this tag',
      );
    }
    await this.tagsService.deleteById(tagId);
    return { status: 410, message: 'Tag deleted' };
  }
}
