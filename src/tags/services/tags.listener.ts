import {
  USER_CREATED_EVENT,
  UserCreatedEvent,
} from '@common/events/users/user-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { Tags } from '@tags/models/tags.models';
import { Users } from '@users/models/users.models';
import { UsersService } from '@users/services/users.service';
import { TagsService } from './tags.service';
import { CreateTagDto } from '@tags/dtos/create-tag.dto';

export class TagsListener {
  constructor(
    @InjectModel(Tags)
    private readonly tagModel: typeof Tags,
    private readonly userService: UsersService,
    private readonly tagService: TagsService,
  ) {}

  @OnEvent(USER_CREATED_EVENT)
  async onUserCreated(userCreatedEvent: UserCreatedEvent): Promise<void> {
    const user: Users = (await this.userService.getUserByEmail(
      userCreatedEvent.email,
    )) as Users;
    if (!user) {
      return;
    }

    const lstDefaultTags: CreateTagDto[] =
      this.tagService.generateDefaultTags(user);
    await this.tagModel.bulkCreate(
      lstDefaultTags.map((tag: CreateTagDto) => {
        return { ...tag };
      }),
    );
  }
}
