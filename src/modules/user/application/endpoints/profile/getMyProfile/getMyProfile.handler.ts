import { UserEntity } from '@core/generated';
import { IUserRepository, UserRepositoryToken } from '@modules/user/domain';
import { BadRequestException, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMyProfileQuery } from './getMyProfile.query';
import { GetMyProfileQueryResponse } from './getMyProfile.response';

@QueryHandler(GetMyProfileQuery)
export class GetMyProfileHandler
  implements IQueryHandler<GetMyProfileQuery, GetMyProfileQueryResponse>
{
  constructor(
    @Inject(UserRepositoryToken)
    private userRepository: IUserRepository,
  ) {}

  async execute(query: GetMyProfileQuery): Promise<GetMyProfileQueryResponse> {
    const { id } = query.reqUser;
    return this.getProfile(id);
  }

  private async getProfile(userId: string) {
    const user = await this.userRepository.findByWhereConditions<UserEntity>({
      conditions: {
        id: userId,
      },
      select: {
        profile: true,
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  select: {
                    permission: {
                      select: {
                        displayName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.mappingResponse(user);
  }

  private mappingResponse(user: UserEntity): GetMyProfileQueryResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,

      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      fullName: user.fullName,

      status: user.status,
      userType: user.userType,
      roles: user.roles?.map((r) => r.role.displayName),
      permissions: user?.roles.flatMap((r) =>
        r.role.permissions.map((p) => p.permission.displayName),
      ),

      address: user.profile?.address,
      phoneNumber: user.profile?.phoneNumber,
      qrUrl: user.profile?.qrUrl,
      avatarUrl: user.profile?.avatarUrl,

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      updatedById: user.updatedById,
    };
  }
}
