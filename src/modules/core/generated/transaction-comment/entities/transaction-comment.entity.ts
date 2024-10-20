import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class TransactionCommentEntity {
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
  transactionId: string;
  @ApiProperty({
    type: 'string',
  })
  ownerUserId: string;
  @ApiProperty({
    type: () => Object,
  })
  content: Prisma.JsonValue;
  @ApiProperty({
    type: () => TransactionEntity,
    required: false,
  })
  transaction?: TransactionEntity;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  owner?: UserEntity;
}
