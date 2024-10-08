import { GroupType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GroupMemberEntity } from '../../group-member/entities/group-member.entity';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { LkCountryEntity } from '../../lk-country/entities/lk-country.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class GroupEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
    type: 'string',
  })
  group_name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatarUrl: string | null;
  @ApiProperty({
    enum: GroupType,
  })
  groupType: GroupType;
  @ApiProperty({
    type: 'string',
  })
  ownerId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lkCurrencyId: string | null;
  @ApiProperty({
    type: () => GroupMemberEntity,
    isArray: true,
    required: false,
  })
  members?: GroupMemberEntity[];
  @ApiProperty({
    type: () => TransactionEntity,
    isArray: true,
    required: false,
  })
  transactions?: TransactionEntity[];
  @ApiProperty({
    type: () => LkCountryEntity,
    required: false,
    nullable: true,
  })
  country?: LkCountryEntity | null;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  owner?: UserEntity;
}
