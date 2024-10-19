import { RequestUser } from '@modules/auth';
import { ReqUser } from '@modules/auth/infra';
import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/shared/http';
import { LogoutCommand } from './logout.command';
import { LogoutResponse } from './logout.response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({
  path: 'logout',
})
@UseInterceptors(ResponseInterceptor)
export class LogoutEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Logout' })
  @Post()
  async create(@ReqUser() user: RequestUser) {
    return this.commandBus.execute<LogoutCommand, LogoutResponse>(
      new LogoutCommand(user),
    );
  }
}
