import { SplitType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { LKExpenseCategoryEntity } from '../../lkexpense-category/entities/lkexpense-category.entity';

export class ExpenseTransactionEntity {
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
    enum: SplitType,
  })
  splitType: SplitType;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lkCategoryId: string | null;
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
    type: () => LKExpenseCategoryEntity,
    required: false,
    nullable: true,
  })
  category?: LKExpenseCategoryEntity | null;
}
