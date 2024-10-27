import { RequestUser } from '@modules/auth';
import { Identified, ReqUser } from '@modules/auth/infra/decorators';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ResponseInterceptor } from '@shared/http';
import { GetMyProfileQuery } from './getMyProfile.query';
import { GetMyProfileQueryResponse } from './getMyProfile.response';

@ApiTags('UAM - Profile')
@Controller({
  path: 'uam',
})
@Identified
@UseInterceptors(ResponseInterceptor)
export class GetMyProfileEndpoint {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get my profile information' })
  @ApiResponse(GetMyProfileQueryResponse)
  @Get('me')
  get(@ReqUser() reqUser: RequestUser): Promise<GetMyProfileQueryResponse> {
    return this.queryBus.execute<GetMyProfileQuery, GetMyProfileQueryResponse>(
      new GetMyProfileQuery(reqUser),
    );
  }
}
