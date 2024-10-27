import { UserEntity } from '@core/generated';
import { PasswordManagerAdapter } from '@modules/auth/domain/adapter';
import { IUserRepository, UserRepositoryToken } from '@modules/user/domain';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePasswordCommand } from './updatePassword.command';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand, void>
{
  constructor(
    @Inject(UserRepositoryToken)
    private userRepository: IUserRepository,
    private readonly pwManager: PasswordManagerAdapter,
  ) {}

  async execute({
    reqUser,
    body: { password, newPassword },
  }: UpdatePasswordCommand): Promise<void> {
    await this.validate({ reqUser, body: { password, newPassword } });

    const hashedPassword = await this.pwManager.generate(newPassword);

    await this.userRepository.update({
      id: reqUser.id,
      hashedPassword,
    } as UserEntity);
  }

  private async validate({
    reqUser,
    body: { password },
  }: UpdatePasswordCommand) {
    const user = await this.userRepository.findById(reqUser.id);

    if (!user) {
      throw new NotFoundException(`User not found ${reqUser}`);
    }

    const isMatchOldPassword = await this.pwManager.compare(
      password,
      user.hashedPassword,
    );

    if (!isMatchOldPassword) {
      throw new BadRequestException('Please input the right old password!');
    }
  }
}
