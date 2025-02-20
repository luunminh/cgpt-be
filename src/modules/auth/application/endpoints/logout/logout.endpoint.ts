import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/shared/http';
import { Identified, ReqUser } from '../../../infra/decorators';
import { RequestUser } from '../../dtos';
import { LogoutCommand } from './logout.command';
import { LogoutResponse } from './logout.response';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
@Identified
@UseInterceptors(ResponseInterceptor)
export class LogoutEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Logout' })
  @Post('logout')
  async create(@ReqUser() user: RequestUser) {
    return this.commandBus.execute<LogoutCommand, LogoutResponse>(
      new LogoutCommand(user),
    );
  }
}
