import { RequestUser } from '@modules/auth';
import { Identified, ReqUser } from '@modules/auth/infra/decorators';
import { Body, Controller, Put, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@shared/http';
import { UpdatePasswordCommand } from './updatePassword.command';
import { UpdatePasswordRequestBody } from './updatePassword.request-body';

@ApiTags('UAM - Profile')
@Controller({
  path: 'uam',
})
@Identified
@UseInterceptors(ResponseInterceptor)
export class UpdatePasswordEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Update my password' })
  @Put('password')
  update(
    @ReqUser() user: RequestUser,
    @Body() body: UpdatePasswordRequestBody,
  ): Promise<void> {
    return this.commandBus.execute<UpdatePasswordCommand, void>(
      new UpdatePasswordCommand(user, body),
    );
  }
}
