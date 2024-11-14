import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Identified, RequestUser, ReqUser } from '@modules/auth';
import {
  PaginatedApiResponse,
  PaginatedResponseInterceptor,
} from '@shared/pagination';
import { GetGroupsQuery } from './get-groups.query';
import { GetGroupsRequestQuery } from './get-groups.request-query';
import {
  GetGroupsQueryResponse,
  GetGroupsResponse,
} from './get-groups.response';

@ApiTags('Group')
@Controller({
  path: 'groups',
})
@ApiBearerAuth()
@Identified
@UseInterceptors(PaginatedResponseInterceptor)
export class GetGroupsEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get Groups' })
  @PaginatedApiResponse(GetGroupsResponse)
  @Get()
  get(
    @ReqUser() user: RequestUser,
    @Query() query: GetGroupsRequestQuery,
  ): Promise<GetGroupsQueryResponse> {
    return this.queryBus.execute<GetGroupsQuery, GetGroupsQueryResponse>(
      new GetGroupsQuery(user, query),
    );
  }
}
