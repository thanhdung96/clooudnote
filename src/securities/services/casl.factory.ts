import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { ACTIONS } from '@common/constants/actions.constants';
import { Injectable } from '@nestjs/common';
import { Tags } from '@tags/models/tags.models';
import { Users } from '@users/models/users.models';

type Subjects = InferSubjects<typeof Tags | typeof Users> | 'all';

export type TagsAbility = MongoAbility<[ACTIONS, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createTagsAbilityForUser(user: Users) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can([ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE], Tags, {
      userId: user.id,
    });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
