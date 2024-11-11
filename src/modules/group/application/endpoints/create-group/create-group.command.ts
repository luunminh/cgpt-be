import { RequestUser } from '@modules/auth';
import { CreateGroupRequestBody } from './create-group.request-body';

export class CreateGroupCommand {
  constructor(
    public readonly user: RequestUser,
    public readonly body: CreateGroupRequestBody,
  ) {}
}
