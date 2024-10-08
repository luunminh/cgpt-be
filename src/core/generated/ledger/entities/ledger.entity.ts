import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class LedgerEntity {
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
    type: 'number',
    format: 'double',
  })
  amount: Prisma.Decimal;
  @ApiProperty({
    type: 'string',
  })
  userIdFrom: string;
  @ApiProperty({
    type: 'string',
  })
  userIdTo: string;
  @ApiProperty({
    type: 'string',
  })
  transactionId: string;
  @ApiProperty({
    type: () => TransactionEntity,
    required: false,
  })
  transaction?: TransactionEntity;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  userFrom?: UserEntity;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  userTo?: UserEntity;
}
