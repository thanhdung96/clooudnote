const ACTION_CREATE = 'create';
const ACTION_READ = 'read';
const ACTION_UPDATE = 'update';
const ACTION_DELETE = 'delete';
const ACTION_LIST = 'list';
const ACTION_MANAGE = 'manage'; // Special action for full control

export enum ACTIONS {
  CREATE = ACTION_CREATE,
  READ = ACTION_READ,
  UPDATE = ACTION_UPDATE,
  DELETE = ACTION_DELETE,
  LIST = ACTION_LIST,
  MANAGE = ACTION_MANAGE,
}
