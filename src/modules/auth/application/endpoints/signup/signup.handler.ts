import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../services';
import { SignupCommand } from './signup.command';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: SignupCommand) {
    const { body } = command;
    return this.authService.signup(body);
  }
}
