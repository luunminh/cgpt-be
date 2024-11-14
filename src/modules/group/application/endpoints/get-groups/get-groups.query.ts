import { RequestUser } from '@modules/auth';
import { GetGroupsRequestQuery } from './get-groups.request-query';

export class GetGroupsQuery {
  constructor(
    public readonly user: RequestUser,
    public readonly options: GetGroupsRequestQuery,
  ) {}
}
