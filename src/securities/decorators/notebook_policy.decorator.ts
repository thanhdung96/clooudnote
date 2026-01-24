import { SetMetadata } from '@nestjs/common';

export const NOTEBOOK_POLICY_KEY = 'NotebookPolicy';

export const NotebookPolicy = (action: any) =>
  SetMetadata(NOTEBOOK_POLICY_KEY, action);
