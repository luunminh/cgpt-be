import { filterOperationByMode } from '@core/utils';
import { RequestUser } from '@modules/auth';
import { GroupRepository } from '@modules/group/domain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { Pagination } from '@shared/pagination';
import { GetGroupsQuery } from './get-groups.query';
import { GetGroupsRequestQuery } from './get-groups.request-query';
import {
  GetGroupsQueryResponse,
  GetGroupsResponse,
} from './get-groups.response';

@QueryHandler(GetGroupsQuery)
export class GetGroupsHandler
  implements IQueryHandler<GetGroupsQuery, GetGroupsQueryResponse>
{
  constructor(private readonly groupRepository: GroupRepository) {}

  public async execute(query: GetGroupsQuery): Promise<GetGroupsQueryResponse> {
    const { data, total } = await this.getGroups(query.user, query.options);

    return Pagination.of(
      { skip: query.options.skip, take: query.options.take },
      total,
      data,
    );
  }

  private async getGroups(user: RequestUser, options: GetGroupsRequestQuery) {
    const { search, skip, take } = options;

    const andWhereConditions: Prisma.Enumerable<Prisma.GroupWhereInput> = [];

    if (search) {
      andWhereConditions.push({
        OR: [
          {
            members: {
              every: {
                memberId: { equals: user.id },
              },
            },
          },
          {
            groupName: filterOperationByMode(search),
          },
        ],
      });
    }

    const countOperation = {
      where: {
        AND: andWhereConditions,
      },
    };

    const [total, data] = await Promise.all([
      this.groupRepository.count(countOperation),
      this.groupRepository.findMany({
        include: {
          members: {
            include: {
              member: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
        where: {
          AND: andWhereConditions,
        },
        orderBy: [
          {
            updatedAt: Prisma.SortOrder.desc,
          },
        ],
        skip,
        take,
      }),
    ]);

    return {
      data: this.mappingResponse(data),
      total,
    };
  }

  private mappingResponse(groups: GroupRawResponse[]): GetGroupsResponse[] {
    return groups.map((gr) => ({
      ...gr,
      members: gr.members.map((m) => ({
        id: m.member.id,
        fullName: m.member.fullName,
        username: m.member.username,
        email: m.member.email,
        memberStatus: m.status,
        userStatus: m.member.status,
        avatarUrl: m.member.profile.avatarUrl,
      })),
    }));
  }
}

type GroupRawResponse = Prisma.GroupGetPayload<{
  include: {
    members: {
      include: {
        member: {
          include: {
            profile: true;
          };
        };
      };
    };
  };
}>;
