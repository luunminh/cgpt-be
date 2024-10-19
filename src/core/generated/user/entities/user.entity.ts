import { UserStatus, UserType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from '../../group/entities/group.entity';
import { VerificationTokenEntity } from '../../verification-token/entities/verification-token.entity';
import { UserToRoleEntity } from '../../user-to-role/entities/user-to-role.entity';
import { GroupMemberEntity } from '../../group-member/entities/group-member.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { TransactionCommentEntity } from '../../transaction-comment/entities/transaction-comment.entity';
import { TransactionParticipantEntity } from '../../transaction-participant/entities/transaction-participant.entity';
import { LedgerEntity } from '../../ledger/entities/ledger.entity';

export class UserEntity {
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
  firstName: string;
  @ApiProperty({
    type: 'string',
  })
  lastName: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  middleName: string | null;
  @ApiProperty({
    type: 'string',
  })
  username: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  fullName: string | null;
  @ApiProperty({
    type: 'string',
  })
  hashedPassword: string;
  @ApiProperty({
    enum: UserStatus,
  })
  status: UserStatus;
  @ApiProperty({
    enum: UserType,
  })
  userType: UserType;
  @ApiProperty({
    type: () => GroupEntity,
    isArray: true,
    required: false,
  })
  groupOwner?: GroupEntity[];
  @ApiProperty({
    type: () => VerificationTokenEntity,
    isArray: true,
    required: false,
  })
  verificationTokens?: VerificationTokenEntity[];
  @ApiProperty({
    type: () => UserToRoleEntity,
    isArray: true,
    required: false,
  })
  roles?: UserToRoleEntity[];
  @ApiProperty({
    type: () => GroupMemberEntity,
    isArray: true,
    required: false,
  })
  groupMember?: GroupMemberEntity[];
  @ApiProperty({
    type: () => ProfileEntity,
    required: false,
    nullable: true,
  })
  profile?: ProfileEntity | null;
  @ApiProperty({
    type: () => TransactionEntity,
    isArray: true,
    required: false,
  })
  ownerTransaction?: TransactionEntity[];
  @ApiProperty({
    type: () => TransactionCommentEntity,
    isArray: true,
    required: false,
  })
  comments?: TransactionCommentEntity[];
  @ApiProperty({
    type: () => TransactionParticipantEntity,
    isArray: true,
    required: false,
  })
  transaction?: TransactionParticipantEntity[];
  @ApiProperty({
    type: () => LedgerEntity,
    isArray: true,
    required: false,
  })
  expenses?: LedgerEntity[];
  @ApiProperty({
    type: () => LedgerEntity,
    isArray: true,
    required: false,
  })
  settlements?: LedgerEntity[];
}
