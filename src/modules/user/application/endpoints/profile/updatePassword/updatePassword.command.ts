import { RequestUser } from '@modules/auth';
import { UpdatePasswordRequestBody } from './updatePassword.request-body';

export class UpdatePasswordCommand {
  constructor(
    public readonly reqUser: RequestUser,
    public readonly body: UpdatePasswordRequestBody,
  ) {}
}
