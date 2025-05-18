import { Injectable } from '@nestjs/common';
import { Tags } from '../models/tags.models';
import { InjectModel } from '@nestjs/sequelize';
import { COLOUR_PRESET } from 'src/common/constants/tags.constants';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags)
    private tagModel: typeof Tags,
  ) {}

  async getAppDefaultTags(): Promise<Tags[]> {
    return await this.tagModel.findAll({
      where: {
        isDefault: true,
      },
    });
  }

  async setAppDefaultTags(): Promise<Tags[]> {
    const lstNewTags = this.generateDefaultTags();

    await this.tagModel.destroy({
      where: {
        isDefault: true,
      },
    });
    await this.tagModel.bulkCreate(
      lstNewTags.map((tag: Tags) => {
        console.log(tag);

        return { ...tag };
      }),
    );

    return lstNewTags;
  }

  private generateDefaultTags(): Tags[] {
    const lstDEfaultTags: Tags[] = COLOUR_PRESET.map(
      (colour: string, index: number) => {
        const tag = new Tags();
        tag.colour = colour;
        tag.name = colour + index.toString();
        tag.description = colour + index.toString();
        tag.isDefault = true;

        return tag;
      },
    );
    return lstDEfaultTags;
  }
}
