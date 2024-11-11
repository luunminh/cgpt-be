import { Identified, RequestUser, ReqUser } from '@modules/auth';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ResponseInterceptor } from '@shared/http';
import { CreateGroupCommand } from './create-group.command';
import { CreateGroupRequestBody } from './create-group.request-body';
import { CreateGroupResponse } from './create-group.response';

@ApiTags('Group')
@Controller({
  path: 'groups',
})
@Identified
@UseInterceptors(ResponseInterceptor)
export class CreateGroupEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'CreateGroup' })
  @ApiResponse(CreateGroupResponse)
  @Post()
  public create(
    @ReqUser() user: RequestUser,
    @Body() body: CreateGroupRequestBody,
  ): Promise<CreateGroupResponse> {
    return this.commandBus.execute<CreateGroupCommand, CreateGroupResponse>(
      new CreateGroupCommand(user, body),
    );
  }
}
