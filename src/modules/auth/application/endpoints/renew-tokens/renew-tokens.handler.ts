import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../services';
import { RenewTokensCommand } from './renew-tokens.command';

@CommandHandler(RenewTokensCommand)
export class ReviewTokenHandler implements ICommandHandler<RenewTokensCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: RenewTokensCommand) {
    const { body } = command;
    return await this.authService.renewToken(body.refreshToken);
  }
}
