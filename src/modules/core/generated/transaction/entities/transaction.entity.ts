import { TransactionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from '../../group/entities/group.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ExpenseTransactionEntity } from '../../expense-transaction/entities/expense-transaction.entity';
import { TransactionCommentEntity } from '../../transaction-comment/entities/transaction-comment.entity';
import { TransactionParticipantEntity } from '../../transaction-participant/entities/transaction-participant.entity';
import { LedgerEntity } from '../../ledger/entities/ledger.entity';

export class TransactionEntity {
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
    enum: TransactionType,
  })
  transactionType: TransactionType;
  @ApiProperty({
    type: 'string',
  })
  groupId: string;
  @ApiProperty({
    type: 'string',
  })
  ownerUserId: string;
  @ApiProperty({
    type: () => GroupEntity,
    required: false,
  })
  group?: GroupEntity;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  owner?: UserEntity;
  @ApiProperty({
    type: () => ExpenseTransactionEntity,
    isArray: true,
    required: false,
  })
  expenseTransaction?: ExpenseTransactionEntity[];
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
  participants?: TransactionParticipantEntity[];
  @ApiProperty({
    type: () => LedgerEntity,
    isArray: true,
    required: false,
  })
  ledgers?: LedgerEntity[];
}
