import { GroupMemberStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GroupMemberModel {
  @ApiProperty({
    enum: GroupMemberStatus,
  })
  status: GroupMemberStatus;
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
}
