import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../services';
import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LogoutCommand) {
    const { user } = command;
    return await this.authService.logout(user.id);
  }
}
