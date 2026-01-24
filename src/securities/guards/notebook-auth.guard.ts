import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '@common/dtos/authenticated_request';
import { UsersService } from '@users/services/users.service';
import { NotesService } from '@notes/services/notes.service';
import { CaslAbilityFactory } from '@securities/services/casl.factory';
import { NoteBooks } from '@notes/models/notebooks.models';
import { ACTIONS } from '@common/constants/actions.constants';
import {
  NotebookPolicy,
  NOTEBOOK_POLICY_KEY,
} from '@securities/decorators/notebook_policy.decorator';

@Injectable()
export class NotebookAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as AuthenticatedRequest & {
      notebook?: NoteBooks;
      currentUser?: any;
    };

    const handler = context.getHandler();
    const action =
      (this.reflector as any).get(NOTEBOOK_POLICY_KEY, handler) ??
      this.defaultAction(context);

    // notebooksId param must exist on nested routes
    const notebooksParam = (req.params &&
      (req.params.notebooksId ?? req.params.notebookId)) as string;
    if (!notebooksParam) {
      // Non-nested route; allow
      return true;
    }

    const notebookId = Number(notebooksParam);
    if (Number.isNaN(notebookId)) {
      throw new NotFoundException('Notebook not found');
    }

    // Load current user
    const currentUser = (await this.usersService.getUserByEmail(
      req.user.email,
    )) as any;
    // Load notebook
    const notebook = await this.notesService.findById(notebookId);
    if (!notebook) {
      throw new NotFoundException('Notebook not found');
    }

    // Check authorization
    const ability =
      this.caslAbilityFactory.createNotebookAbilityForUser(currentUser);
    if (ability.cannot(action, notebook)) {
      throw new UnauthorizedException(
        'You are not authorized to access this notebook',
      );
    }

    // Attach for downstream handlers
    (req as any).notebook = notebook;
    (req as any).currentUser = currentUser;
    return true;
  }

  private defaultAction(context: ExecutionContext): ACTIONS {
    const method = context.switchToHttp().getRequest().method;
    return method === 'GET' ? ACTIONS.READ : ACTIONS.UPDATE;
  }
}
