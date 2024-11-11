import { Identified, RequestUser, ReqUser } from '@modules/auth';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ResponseInterceptor } from '@shared/http';
import { GetContentsQuery } from './get-contents.query';
import { GetContentsResponse } from './get-contents.response';

@ApiTags('Content')
@ApiBearerAuth()
@Controller({
  path: 'contents',
})
@Identified
@UseInterceptors(ResponseInterceptor)
export class GetContentsEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'GetContents' })
  @ApiResponse(GetContentsResponse)
  @Get()
  get(@ReqUser() user: RequestUser): Promise<GetContentsResponse[]> {
    return this.queryBus.execute<GetContentsQuery, GetContentsResponse[]>(
      new GetContentsQuery(user.id),
    );
  }
}
