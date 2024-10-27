import { RequestUser } from '@modules/auth';

export class GetMyProfileQuery {
  constructor(public readonly reqUser: RequestUser) {}
}
