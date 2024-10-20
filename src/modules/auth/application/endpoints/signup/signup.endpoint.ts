import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@shared/http';
import { SignupCommand } from './signup.command';
import { SignupRequestBody } from './signup.request-body';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({
  path: 'auth',
})
@UseInterceptors(ResponseInterceptor)
export class SignupEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Sign up' })
  @Post('signup')
  create(@Body() body: SignupRequestBody) {
    return this.commandBus.execute<SignupCommand, void>(
      new SignupCommand(body),
    );
  }
}
