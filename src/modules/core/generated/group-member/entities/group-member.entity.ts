import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { GroupEntity } from '../../group/entities/group.entity';

export class GroupMemberEntity {
  @ApiProperty({
    type: 'string',
  })
  memberId: string;
  @ApiProperty({
    type: 'string',
  })
  groupId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updatedById: string | null;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  member?: UserEntity;
  @ApiProperty({
    type: () => GroupEntity,
    required: false,
  })
  group?: GroupEntity;
}
