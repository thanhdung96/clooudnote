import { TagsAbility } from './casl.factory';

interface IPolicyHandler {
  handle(ability: TagsAbility): boolean;
}

type PolicyHandlerCallback = (ability: TagsAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
