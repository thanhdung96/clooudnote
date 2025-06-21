import { Injectable } from '@nestjs/common';
import { Tags } from '@tags/models/tags.models';
import { COLOUR_PRESET } from '@common/constants/tags.constants';
import { Users } from '@users/models/users.models';
import { CreateTagDto } from '@tags/dtos/create-tag.dto';

@Injectable()
export class TagsService {
  public generateDefaultTags(user: Users): CreateTagDto[] {
    const lstDEfaultTags: CreateTagDto[] = COLOUR_PRESET.map(
      (colour: string, index: number) => {
        return {
          colour,
          name: colour + index.toString(),
          description: colour + index.toString(),
          userId: user.id,
        };
      },
    );
    return lstDEfaultTags;
  }
}
