import { GroupModel } from '@core/generated/group/dto';
import { ApiProperty } from '@nestjs/swagger';
import { GroupMemberStatus, UserStatus } from '@prisma/client';
import { PaginatedApiResponseDto } from '@shared/pagination';

class GroupUserDto {
  @ApiProperty({
    example: '2b3b3b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    example: 'john_due@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'ACTIVE',
  })
  userStatus: UserStatus;

  @ApiProperty({
    example: 'https://www.google.com',
  })
  avatarUrl: string;

  @ApiProperty({
    example: 'ACTIVE',
  })
  memberStatus: GroupMemberStatus;
}

export class GetGroupsResponse extends GroupModel {
  @ApiProperty({
    example: '2b3b3b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b',
  })
  lkCurrencyId: string;

  @ApiProperty({
    example: '2b3b3b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b',
  })
  ownerId: string;

  @ApiProperty({
    isArray: true,
  })
  members: GroupUserDto[];
}

export class GetGroupsQueryResponse extends PaginatedApiResponseDto<GetGroupsResponse> {
  @ApiProperty({
    isArray: true,
  })
  data: GetGroupsResponse[];
}
