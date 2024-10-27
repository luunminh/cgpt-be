import { RequestUser } from '@modules/auth';
import { UpdateMyProfileRequestBody } from './updateMyProfile.request-body';

export class UpdateMyProfileCommand {
  constructor(
    public readonly reqUser: RequestUser,
    public readonly body: UpdateMyProfileRequestBody,
  ) {}
}
