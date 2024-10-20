import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@shared/http';
import { LoginCommand } from './login.command';
import { LoginRequestBody } from './login.request-body';
import { LoginResponse } from './login.response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({
  path: 'auth',
})
@UseInterceptors(ResponseInterceptor)
export class LoginEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Login' })
  @Post('login')
  async create(@Body() body: LoginRequestBody) {
    return this.commandBus.execute<LoginCommand, LoginResponse>(
      new LoginCommand(body),
    );
  }
}
