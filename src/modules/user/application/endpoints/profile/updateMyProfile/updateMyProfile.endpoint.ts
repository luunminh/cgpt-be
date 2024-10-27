import { RequestUser } from '@modules/auth';
import { Identified, ReqUser } from '@modules/auth/infra/decorators';
import { Body, Controller, Put, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@shared/http';
import { UpdateMyProfileCommand } from './updateMyProfile.command';
import { UpdateMyProfileRequestBody } from './updateMyProfile.request-body';

@ApiTags('UAM - Profile')
@Controller({
  path: 'uam',
})
@Identified
@UseInterceptors(ResponseInterceptor)
export class UpdateMyProfileEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Update my profile information.' })
  @Put('me')
  update(
    @ReqUser() user: RequestUser,
    @Body() body: UpdateMyProfileRequestBody,
  ): Promise<void> {
    return this.commandBus.execute<UpdateMyProfileCommand, void>(
      new UpdateMyProfileCommand(user, body),
    );
  }
}
