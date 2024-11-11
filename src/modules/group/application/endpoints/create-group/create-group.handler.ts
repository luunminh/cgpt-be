import { RequestUser } from '@modules/auth';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GroupMemberStatus, GroupType } from '@prisma/client';
import { GroupRepository } from '../../../domain';
import { CreateGroupCommand } from './create-group.command';
import { CreateGroupRequestBody } from './create-group.request-body';
import { CreateGroupResponse } from './create-group.response';

@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler
  implements ICommandHandler<CreateGroupCommand, CreateGroupResponse>
{
  constructor(private readonly groupRepository: GroupRepository) {}
  public async execute(
    command: CreateGroupCommand,
  ): Promise<CreateGroupResponse> {
    return await this.createGroup(command.user, command.body);
  }

  private async createGroup(
    user: RequestUser,
    body: CreateGroupRequestBody,
  ): Promise<CreateGroupResponse> {
    const {
      name: groupName,
      lkCurrencyId,
      members,
      type,
      avatarUrl,
      description,
    } = body;

    return this.groupRepository.create({
      data: {
        groupName,
        avatarUrl,
        description,
        updatedById: user.id,
        slug: generateGroupSlug(groupName),
        groupType: type as unknown as GroupType,
        owner: { connect: { id: user.id } },
        country: { connect: { id: lkCurrencyId } },
        members: {
          createMany: {
            data: members.map((member) => ({
              memberId: member,
              status: GroupMemberStatus.ACTIVE,
            })),
          },
        },
      },
    });
  }
}
