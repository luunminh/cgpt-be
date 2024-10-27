import { UserEntity } from '@core/generated';
import { getFullName } from '@core/utils';
import { IUserRepository, UserRepositoryToken } from '@modules/user/domain';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMyProfileCommand } from './updateMyProfile.command';

@CommandHandler(UpdateMyProfileCommand)
export class UpdateMyProfileHandler
  implements ICommandHandler<UpdateMyProfileCommand, void>
{
  constructor(
    @Inject(UserRepositoryToken)
    private userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateMyProfileCommand): Promise<void> {
    const { body, reqUser } = command;

    await this.userRepository.update({
      id: reqUser.id,

      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      middleName: body.middleName,
      fullName: getFullName(body),

      profile: {
        qrUrl: body.qrUrl,
        address: body.address,
        avatarUrl: body.avatarUrl,
        phoneNumber: body.phoneNumber,
      },
    } as UserEntity);
  }
}
