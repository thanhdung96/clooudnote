import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { ACTIONS } from '@common/constants/actions.constants';
import { Injectable } from '@nestjs/common';
import { NoteBooks } from '@notes/models/notebooks.models';
import { Sections } from '@notes/models/sections.models';
import { Tags } from '@tags/models/tags.models';
import { Users } from '@users/models/users.models';

type TagUserSubject = InferSubjects<typeof Tags | typeof Users> | 'all';
type NotebookUserSubject =
  | InferSubjects<typeof NoteBooks | typeof Users>
  | 'all';
type SectionUserSubject = InferSubjects<typeof Sections | typeof Users> | 'all';

export type TagsAbility = MongoAbility<[ACTIONS, TagUserSubject]>;

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
        item.constructor as ExtractSubjectType<TagUserSubject>,
    });
  }

  createNotebookAbilityForUser(user: Users) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can([ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE], NoteBooks, {
      userId: user.id,
    });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<NotebookUserSubject>,
    });
  }

  createSectionAbilityForUser(user: Users) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can([ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE], Sections, {
      notebook: {
        userId: user.id,
        deletedAt: null,
      },
    });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<SectionUserSubject>,
    });
  }
}
