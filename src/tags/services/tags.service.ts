import { Injectable } from '@nestjs/common';
import { Tags } from '@tags/models/tags.models';
import { COLOUR_PRESET } from '@common/constants/tags.constants';
import { Users } from '@users/models/users.models';
import { CreateTagDto } from '@tags/dtos/create-tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTagDto } from '@tags/dtos/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags)
    private tagsModel: typeof Tags,
  ) {}

  async getAll(user: Users): Promise<Tags[]> {
    return await this.tagsModel.findAll({
      where: {
        userId: user.id,
      },
    });
  }

  async getTagById(tagId: number): Promise<Tags | null> {
    return await this.tagsModel.findByPk(tagId);
  }

  async getById(id: number): Promise<Tags | null> {
    return await Tags.findOne({ where: { id } });
  }

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

  async create(createTagDto: CreateTagDto, user: Users): Promise<Tags> {
    createTagDto.userId = user.id;
    return await this.tagsModel.create({ ...createTagDto });
  }

  async updateById(id: number, updateTagDto: UpdateTagDto): Promise<Tags> {
    const tag = await this.getById(id);
    if (!tag) {
      throw new Error('Tag not found');
    }
    await tag.update({ ...updateTagDto });
    return tag;
  }

  async deleteById(id: number): Promise<void> {
    const tag = await this.getById(id);
    if (tag) {
      await tag.destroy();
    }
  }
}
