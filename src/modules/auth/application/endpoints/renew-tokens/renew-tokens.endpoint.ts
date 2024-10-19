import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@shared/http';
import { RenewTokensCommand } from './renew-tokens.command';
import { RenewTokensRequestBody } from './renew-tokens.request-body';
import { RenewTokensResponse } from './renew-tokens.response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({
  path: 'renew-tokens',
})
@UseInterceptors(ResponseInterceptor)
export class RenewTokensEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'RenewTokens' })
  @Post()
  async create(@Body() body: RenewTokensRequestBody) {
    return this.commandBus.execute<RenewTokensCommand, RenewTokensResponse>(
      new RenewTokensCommand(body),
    );
  }
}
